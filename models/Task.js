const mongoose = require("mongoose");

const descriptionSchema = new mongoose.Schema({
type: String,
});

const taskSchema = new mongoose.Schema(
{
    title: {
    type: String,
    required: true,
    },
    descriptions: [descriptionSchema],

    category: {
    type: String, 
    required: true,
    },

    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
},
{ timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

//? Why embedding Description?
//* Since I will often need to update the Description: I think it is better to 
//* embed the info because it can improve read performance because 
//* all required data is available in a single query
//! CONS: if description gets too big(more than 16MB) then I will need 
//! to use the reference method


//? Why reference Owner?
//* I don't need to owner all the time so I can reference it if I need to 