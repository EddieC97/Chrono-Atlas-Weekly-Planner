const express = require("express");

const router = express.Router();

const User = require("../models/User");

const Task = require("../models/Task");

const Calendar = require("../models/Calendar");

//* CREATE

router.get("/new", async (req, res) => {
  const weeksAvailable = await Calendar.find({
    owner:req.session.user.id
  });

  res.render("tasks/new.ejs", { weeksAvailable });
});

router.post("/", async (req, res) => {
  const weeksAvailable = await Calendar.find({
    owner:req.session.user.id
  });



  const descriptionData = {
    type: req.body.description,
  };

  const invalidTitle = req.body.title === "";
  if (invalidTitle) {
    res.render("tasks/new.ejs", {
      weeksAvailable,
      errorMessage: "Please enter a title for your task!",
      description: [descriptionData],
      category: req.body.category,
      owner: req.session.user.id,
      week: req.body.week,
      day: req.body.day,
    });
    return;
  }

  const invalidCategory =
    req.body.category === "calendar tasks" && (!req.body.week || !req.body.day);

  if (invalidCategory) {
    res.render("tasks/new.ejs", {
      weeksAvailable,
      errorMessage: `Please choose a week and day before creating your task. Alternatively, you can select either the "2nd Brain" category or the "Weekly Tasks" category.`,
      title: req.body.title,
      description: [descriptionData],
      category: req.body.category,
      owner: req.session.user.id,
      week: req.body.week,
      day: req.body.day,
    });
    return;
  }

  if (req.body.category === "calendar tasks") {
    const newTask = await Task.create({
      weeksAvailable,
      title: req.body.title,
      description: [descriptionData],
      category: req.body.category,
      owner: req.session.user.id,
      week: req.body.week,
      day: req.body.day,
    });
  } else {
    const newTask = await Task.create({
      weeksAvailable,
      title: req.body.title,
      description: [descriptionData],
      category: req.body.category,
      owner: req.session.user.id,
    });
  }

  res.redirect("/tasks");
});

//* READ


router.get("/", async (req, res) => {
  const task = await Task.find()
 

  const secondBrain = await Task.find({
    category: `2nd brain`,
    owner: req.session.user.id,
  });
  const weeklyTask = await Task.find({
    category: "weekly tasks",
    owner: req.session.user.id,
  });

  const assignedTask = await Task.find({
    category: "calendar tasks",
    owner:req.session.user.id
  });

  res.render("tasks/index.ejs", { secondBrain, weeklyTask, assignedTask });
});

router.get("/:id", async (req, res) => {
  const specificWeek = await Calendar.findById(req.params.id);
  const task = await Task.findById(req.params.id);

  if (task.owner.equals(req.session.user.id)) {
    res.render("tasks/show.ejs", { task });
  } else {
    res.render("tasks/error404.ejs", {
      errorMessage: `You don't have permission to view that! `,
    });
    return;
  }
});


//* UPDATE

router.get("/:id/edit", async (req, res) => {
  const task = await Task.findById(req.params.id);
  const weeksAvailable = await Calendar.find({
    owner:req.session.user.id
  });

  if (task.owner.equals(req.session.user.id)) {
    
    res.render("tasks/edit.ejs", { task, weeksAvailable });
  } else {
    res.render("tasks/error404.ejs", {
      errorMessage: `You don't have permission to edit that! `,
    });
    return;
  }
});

router.put("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  const weeksAvailable = await Calendar.find({
    owner:req.session.user.id
  });

  const updatedDescription = {
    type: req.body.description,
  };

  if (task.owner.equals(req.session.user.id)) {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id,  {
      weeksAvailable,
      title: req.body.title,
      description: [updatedDescription],
      category: req.body.category,
      week: req.body.week,
      day: req.body.day,
    }, {
      new: true,
    });

    res.redirect(`/tasks/${req.params.id}`);
  } else {
    res.render("tasks/error404.ejs", {
      errorMessage: `You don't have permission to edit that! `,
    });
    return;
  }
});


//* DELETE

router.delete("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task.owner.equals(req.session.user.id)) {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.redirect("/tasks");
  } else {
    res.render("tasks/error404.ejs", {
      errorMessage: `You don't have permission to delete that! `,
    });
    return;
  }
});

module.exports = router;


