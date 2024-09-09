//* This gets the format function from date-fns
const {format, addDays, addWeeks, subWeeks} = require('date-fns')



const today = new Date()

const formatToday = format(today, 'dd-MM-yyyy')

console.log(`Today's date:-----`, formatToday) //* This outputs 09-09-2024

//* checking for tomorrow's date 

const tomorrow = addDays(formatToday, 1)
const formatTomorrow = format(tomorrow, 'dd-MM-yyyy')

console.log(formatTomorrow) //* this output 10-09-2024

//* checking for next week date 

const nextWeek = addWeeks(today, 1) 
const formatNextWeek = format(nextWeek, "dd-MM-yyyy")

console.log("Next's week date is --->", formatNextWeek)
//* This outputs 16-09-2024

const lastWeek = subWeeks(today, 1)
const formatLastWeek = format(lastWeek, 'dd-MM-yyyy')

console.log(`Last week date is ---->`, formatLastWeek )

//TODO - test the start date for tomorrow and make sure it defaults to Monday 


