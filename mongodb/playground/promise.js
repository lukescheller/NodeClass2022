const User = require("../models/User");
const DB_CONNECTION = require("../config/connect");

DB_CONNECTION();

// 6254a8ba452087e7b09736e7

const id = "6254a917681a502fd668c826";

// User.findByIdAndUpdate(id, { age: 1 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount(id, 20000000)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
