const express = require("express");

const router = express.Router();

const User = require("../models/User");

const Task = require("../models/Task");

const Calendar = require("../models/Calendar")

const { format, addDays, startOfWeek, parse, isValid } = require("date-fns");






//* CREATE

router.get('/new' , (req,res) => {
    res.render("calendar/new.ejs")
})



router.post('/', async (req,res) => {

    const dateCheck = parse(req.body.date, 'dd/MM/yyyy', new Date())


    if(isValid(dateCheck)){
        // isValid(Boolean) checks if the date exists,
        //If it exits, then it will return true
        

        const newCalendarWeek = await Calendar.create({
            title:req.body.title,
            date: req.body.date,
            owner:req.session.user.id
        })
    
        res.redirect('/calendars')


    } else {

        res.render('calendar/new.ejs', {
            errorMessage:`Please enter a valid date with the format of dd/MM/YYYY 
            For example: 01/01/2024`,
            title:req.body.title
            

        })
        return;

    }
    
})

//* READ

router.get('/', async (req,res) => {
    const weekIndex = await Calendar.find()
    // const weeklyTask = await Task.find() // TODO- check how to pass info into the todo-list 

    res.render("calendar/index.ejs", {weekIndex})
})



router.get("/:id", async (req,res) => {

    const week = await Calendar.findById(req.params.id)

    const dateFormat = 'dd/MM/yyyy'
    const today = parse(week.date, dateFormat, new Date())
    

    
    /*  we cannot pass the week.date directly into the date-fns function 
        because is is in a format that it doesn't understand , 
        so we need the dateFormat set to dd/MM/yyyy so date-fns understands
        how to read it:
        1. so the first argument is the info you want to pass it through:
        in this case is the week.date which is a string
        2. the second argument is the dateFormat which is also a string
        3.the new Date() is the reference date: in cases where we don't
        specify a year in the first argument. For example 09/09 and you have
        3rd argument of 01/01/2024 , it will then know to convert 09/09 into 
        09/09/2024, in the doc: if you are ever unsure, just go with new Date()
        ;; Date is a built-in JavaScript object that is used for handling 
        dates and times. so if
        const now = new Date() will just capture today's date and time 
        and that can be used as a reference
        More info on how this date-fns works can be found 
        https://date-fns.org/v3.6.0/docs/parse ( I followed the example
        in the bottom to get the right format)
    */


    // this makes sure the start of the week is Monday (09/09/2024)
    // Default is Sunday
    const startOfTheWeek = startOfWeek(today, { weekStartsOn: 1 });

    let monday = addDays(startOfTheWeek, 0);
    let formatMonday = format(monday, "dd-MM-yyyy");

    let tuesday = addDays(startOfTheWeek, 1);
    let formatTuesday = format(tuesday, "dd-MM-yyyy");

    let wednesday = addDays(startOfTheWeek, 2);
    let formatWednesday = format(wednesday, "dd-MM-yyyy");

    let thursday = addDays(startOfTheWeek, 3);
    let formatThursday = format(thursday, "dd-MM-yyyy");

    let friday = addDays(startOfTheWeek, 4);
    let formatFriday = format(friday, "dd-MM-yyyy");

    let saturday = addDays(startOfTheWeek, 5);
    let formatSaturday = format(saturday, "dd-MM-yyyy");

    let sunday = addDays(startOfTheWeek, 6);
    let formatSunday = format(sunday, "dd-MM-yyyy");

    const formatDates = {
    formatMonday,
    formatTuesday,
    formatWednesday,
    formatThursday,
    formatFriday,
    formatSaturday,
    formatSunday,
    };
    

    if(week.owner.equals(req.session.user.id)) {
        res.render('calendar/showweekly.ejs', {week,formatDates})
    } else {
        res.render("tasks/error404.ejs", {
        errorMessage: `You don't have permission to view that week!`
        })
        return
    }

})



module.exports = router;
