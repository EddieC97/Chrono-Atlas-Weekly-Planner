const express = require('express')

const router = express.Router()

const User = require('../models/User')

const Task = require('../models/Task')

//* CREATE

router.get('/new', (req,res) => {
    res.render("task/new.ejs")


})


//* READ

//* UPDATE

//* DELETE






module.exports = router;