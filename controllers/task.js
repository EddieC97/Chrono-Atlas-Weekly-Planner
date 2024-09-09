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
        owner: req.session.user.id

    });

    res.redirect('/tasks')
})


//* READ

router.get('/', async (req, res) => {

    const secondBrain = await Task.find({category: `2nd brain`})
    const weeklyTask = await Task.find({category: 'weekly tasks'})

    res.render("tasks/index.ejs", {secondBrain , weeklyTask})
})

router.get('/:id', async (req,res) => {
    const task = await Task.findById(req.params.id)

    res.render('tasks/show.ejs', {task})
})



//* UPDATE

router.get("/:id/edit", async (req,res) => {
    const task = await Task.findById(req.params.id)

    if(task.owner.equals(req.session.user.id)) {

        const task = await Task.findById(req.params.id)
        res.render('tasks/edit.ejs', {task})
    
    } else {
        res.render("tasks/error404.ejs", {
                errorMessage: `You don't have permission to edit that! `
        })
    }
    
})



router.put('/:id', async (req,res) => {
    const task = await Task.findById(req.params.id)

    if(task.owner.equals(req.session.user.id)){

        const updatedDescription = {
            type: req.body.description,
        }
    
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { 
                title:req.body.title,
                description:[updatedDescription],
                category:req.body.category
    
            },
            { new: true }
        )
    
        res.redirect(`/tasks/${req.params.id}`)

    } else {
        res.render("tasks/error404.ejs", {
        errorMessage: `You don't have permission to edit that! `
        })

    }


    
})




//* DELETE

router.delete('/:id', async (req,res) => {


    const task = await Task.findById(req.params.id)

    if(task.owner.equals(req.session.user.id)) {

    const task = await Task.findByIdAndDelete(req.params.id)
    res.redirect('/tasks')

    } else {
        res.render("tasks/error404.ejs", {
            errorMessage: `You don't have permission to delete that! `
        })
    }
    

})






module.exports = router;



//TODO - add isLoggedIn into all routes for better security 
//TODO - add owner check prior to edit + delete function 