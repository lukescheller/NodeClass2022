const Task = require("../models/Task");
const DB_CONNECTION = require("../config/connect");

DB_CONNECTION();

// Task.find({ completed: false })
//   .then((tasks) => {
//     console.log("TASKS: " + tasks);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log("RESULT: " + result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const incompletedTasks = await Task.countDocuments({ completed: true });
  return incompletedTasks;
};

deleteTaskAndCount("62557158c7bc61c81eb0875e")
  .then((t) => {
    console.log(t);
  })
  .catch((e) => {
    console.log(e);
  });
