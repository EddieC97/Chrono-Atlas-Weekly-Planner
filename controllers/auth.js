const express = require('express')

const router = express.Router()

const User = require('../models/User')

const bcrypt = require('bcrypt')
const { userInfo } = require('os')

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

    req.session.user = {
        username: createUser.username,
        id: createUser.id
    }

    req.session.save( ()=> {
        res.redirect('/')
    })

})

//* LOGIN PROCESS
router.get("/login", (req, res) => {

    res.render('auth/login.ejs', {helperMessage: req.query.message})

})

router.post('/login', async (req,res) => {

    const UserInDatabase = await User.findOne({username: req.body.username})

    if (UserInDatabase === null) {
        res.render('auth/login.ejs', {
            errorMessage: " No such account with this username. Perhaps you mistyped it?",
            username: req.body.username
        });
        return;
    }

    if(bcrypt.compareSync (req.body.password, UserInDatabase.password) === false) {
        res.render('auth/login.ejs', {
            errorMessage: "Incorrect password. Perhaps you mistyped it?", 
            username: req.body.username
        });
        return;
    }
    

    req.session.user = {
        username: UserInDatabase.username,
        id: UserInDatabase.id
    }

    req.session.save( ()=> {
        res.redirect('/')
    })

})

//* LOGOUT PROCESS


router.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/')
})



//! remember to add this or else server can't connect 
module.exports = router;