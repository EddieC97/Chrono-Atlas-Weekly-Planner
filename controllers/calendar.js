const express = require("express");

const router = express.Router();

const User = require("../models/User");

const Task = require("../models/Task");

const { format, addDays, addWeeks, startOfWeek } = require("date-fns");

//* checking dates to display below the days




//* show selected day









//! not sure what to do with this code now 
// router.get("/", (req, res) => {

// //this gets today's date (10/09/2024)
// const today = new Date();

// // this makes sure the start of the week is Monday (09/09/2024)
// // Default is Sunday
// const startOfTheWeek = startOfWeek(today, { weekStartsOn: 1 });

// let monday = addDays(startOfTheWeek, 0);
// let formatMonday = format(monday, "dd-MM-yyyy");

// let tuesday = addDays(startOfTheWeek, 1);
// let formatTuesday = format(tuesday, "dd-MM-yyyy");

// let wednesday = addDays(startOfTheWeek, 2);
// let formatWednesday = format(wednesday, "dd-MM-yyyy");

// let thursday = addDays(startOfTheWeek, 3);
// let formatThursday = format(thursday, "dd-MM-yyyy");

// let friday = addDays(startOfTheWeek, 4);
// let formatFriday = format(friday, "dd-MM-yyyy");

// let saturday = addDays(startOfTheWeek, 5);
// let formatSaturday = format(saturday, "dd-MM-yyyy");

// let sunday = addDays(startOfTheWeek, 6);
// let formatSunday = format(sunday, "dd-MM-yyyy");

// const formatDates = {
// formatMonday,
// formatTuesday,
// formatWednesday,
// formatThursday,
// formatFriday,
// formatSaturday,
// formatSunday,
// };
// //* all Dates correct and formatted correctly

// res.render('calendar/weekly.ejs', {formatDates})



// });





module.exports = router;
