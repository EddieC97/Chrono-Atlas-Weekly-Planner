const express = require('express')

const router = express.Router()

const User = require('../models/User')

const Task = require('../models/Task')

//* CREATE

router.get('/new', (req,res) => {
    
    res.render("tasks/new.ejs")


})

router.post('/' , async (req, res) => {
    const descriptionData = {
        type: req.body.description,
    }

    

    const newTask = await Task.create({
        title: req.body.title,
        description: [descriptionData],
        category: req.body.category,
        owner: req.session.user._id

    });

    res.redirect('/task')
})


//* READ

router.get('/', async (req, res) => {
    const tasks = await Task.find()
    res.render("tasks/index.ejs", {tasks})
})



//* UPDATE

//* DELETE






module.exports = router;


// TODO - ask Gareth how to link owner from Task.js from model into controller task.js. Currently if i let it in, 
//will break the whole system 
