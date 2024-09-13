const express = require("express")
const app = express()
const methodOverride = require("method-override")
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require("mongoose")
const User = require('./models/User.js')
const authController = require('./controllers/auth.js')
const taskController = require("./controllers/task.js")
const calendarController = require('./controllers/calendar.js')

app.set("View engine", "ejs")

app.use(express.static("public"))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(methodOverride ("_method", {methods: ['POST', 'GET']}))

require("dotenv").config()

app.listen(process.env.PORT, () => {
    console.log('server listening on http://localhost:3000')
})

app.use(session ({
    secret:process.env.SESSION_SECRET, 
    resave:false, 
    saveUninitialized: true, 
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI})
}))

app.use((req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null;
    next()
})

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('open', () => {
    console.log('connected to MONGO!')
})

app.get('/', (req,res) => {

    res.render('home.ejs')
})

app.use('/auth', authController)

app.use('/tasks', isLoggedIn, taskController)

app.use('/calendars', isLoggedIn, calendarController)

function isLoggedIn (req,res,next) {

    if(req.session.user){
        next()
    }else {
        res.redirect(`/auth/login?message=1`)
    }

}   



