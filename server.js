const express = require("express")
const app = express()

app.set("View engine", "ejs")

app.use(express.static("public"))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const methodOverride = require("method-override")
app.use(methodOverride ("_method", {methods: ['POST', 'GET']}))

app.listen(3000, () => {
    console.log('server listening on http://localhost:3000')
})

require("dotenv").config()

const session = require('express-session')

const MongoStore = require('connect-mongo')

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


const mongoose = require("mongoose")
const User = require('./models/User.js')

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('open', () => {
    console.log('connected to MONGO!')
})

app.get('/', (req,res) => {

    res.render('home.ejs')
})



//* Load this from our separate controller file 
const authController = require('./controllers/auth.js')
app.use('/auth', authController)

//* Load this from our separate controller file 
const taskController = require("./controllers/task.js")
app.use('/tasks', isLoggedIn, taskController)

const calendarController = require('./controllers/calendar.js')
app.use('/calendars', isLoggedIn, calendarController)
//TODO - make sure it can display in the index.ejs file properly 

function isLoggedIn (req,res,next) {

    if(req.session.user){
        next()
    }else {
        res.redirect(`/auth/login?message=1`)
    }

}   

//TODO - deploy to render.com 
//TODO - remember to do the README
//TODO - add youtube video to error 404 
//TODO - check if isLoggedIn fn else statement is showing the right message
//* I think it is but need to double check 
