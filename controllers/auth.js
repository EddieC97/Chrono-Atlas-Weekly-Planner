const express = require('express')

const router = express.Router()

const User = require('../models/User')

const bcrypt = require('bcrypt')

//* Sign-up process

router.get("/signup", (req,res) => {
    res.render("auth/signup.ejs")
})

router.post('/signup' , async (req,res) => {

    const UserInDatabase = await User.findOne({username: req.body.username})

    if(UserInDatabase !== null) {
        res.render("auth/signup.ejs", {
            errorMessage:"Your username is already taken. Perhaps you forgot?", 
            username: req.body.username
        });
        return
    }

    if (req.body.password !== req.body.passwordConfirmation){
        res.render("auth/signup.ejs", {
            errorMessage: `Your passwords don't match. Please try again!` ,
            username:req.body.username
        })
        return;
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10)

    req.body.password = hashedPassword;

    const createUser = await User.create ({
        username: req.body.username,
        password:hashedPassword,

        
    })

    res.redirect("/")

})

//TODO - Finish Login page 




//! remember to add this or else server can't connect 
module.exports = router;