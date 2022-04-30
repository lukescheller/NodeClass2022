const express = require("express");
const router = new express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// router.get("/tasks", auth, async (req, res) => {
//   try {
//     const tasks = await Task.find({
//       owner: req.user._id,
//     });
//     res.status(200).send(tasks);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

//pagination - limit of results that show up
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    //makes it dynamic - req.query.completed or {{url}}/tasks?completed=false - completed=true or completed=false - doesn't matter
    match.completed = req.query.completed === "true";
  }
  // console.log(match);

  if (req.query.sortBy) {
    //splits createdAt:desc or asc -> ['createdAt':'desc']
    const parts = req.query.sortBy.split(":");
    // console.log(parts);
    //ternary
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user.populate({
      //what does path: "tasks" mean
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        // sort: {
        //   createdAt: -1 or 1
        //   completed: 1,
        // },
        sort,
      },
    });
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

//you can only get the tasks when you're logged in
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send("task not found");
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send({ ERROR: error });
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    //brcypt doesn't have to be used for this to work within the taskSchema
    // const task = await Task.findByIdAndUpdate(id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!task) {
      return res.status(404).send("no task with this id found");
    }
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    // const task = await Task.findByIdAndDelete(id);
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send("no task with this id found");
    }
    res.status(200).send("task deleted");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
