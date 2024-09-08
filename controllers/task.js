const express = require('express')

const router = express.Router()

const User = require('../models/User')

const Task = require('../models/Task')

//* CREATE

router.get('/new', (req,res) => {
    res.render("tasks/new.ejs")


})

router.post('/' ,async (req,res) => {
    // const description = await Task.create({
    //     description: req.body.description
    // })

    const newTask = await Task.create({
        Title: req.body.title,
        Description: req.body.description,
        Category: req.body.category,
        Owner: req.session.user._id

    });

    res.redirect('/tasks')
})


//* READ

router.get('/', async (req, res) => {
    const tasks = await Task.find()
    res.render("tasks/index.ejs", {tasks})
})



//* UPDATE

//* DELETE






module.exports = router;