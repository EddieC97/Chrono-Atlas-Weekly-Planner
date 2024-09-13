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
    description: [descriptionSchema],

    category: {
    type: String, 
    required: true,
    },

    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true,
    
    },
    week: {
        type:String
    },
    
    day: {
        type: String
    }
},
{ timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

