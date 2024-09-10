const mongoose = require("mongoose")

const calendarSchema = new mongoose.Schema(
{
    title:{
        type: String, 
        required: true
    },

    date: {
        type: String, 
        required: true 
    }, 
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    }

}, 
{timestamps: true}
);

const Calendar = mongoose.model("Calendar" , calendarSchema);

module.exports = Calendar
