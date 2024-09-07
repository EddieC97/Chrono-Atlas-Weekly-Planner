const express = require('express')

const router = express.Router()

const User = require('../models/User')

const bcrypt = require('bcrypt')

//* Sign-up form 

router.get("/signup", (req,res) => {
    res.render("auth/signup")
})