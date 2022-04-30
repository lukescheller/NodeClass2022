const express = require("express");
const DB_CONNECTION = require("./config/connect");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const app = express();
const PORT = process.env.port || 3000;

DB_CONNECTION();

app.use(express.json());

// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   if (req.method === "GET") {
//     res.send("get is not possible");
//   } else {
//     next();
//   }
// });

//middleware
// app.use((req, res, next) => {
//   res.status("503").send("in maintenance mode");
// });

//MULTER
// const multer = require("multer");
// const upload = multer({
//   dest: "images",
//   limits: {
//     //under 1 megabyte only
//     fileSize: 1000000,
//   },
//   //regex101.com - \.(doc|docx)$ - doc or docx
//   fileFilter(req, file, cb) {
//     // cb(new Error("file must be a pdf"));
//     // cb(undefined, true)
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error("please upload a word document"));
//     }
//     //if the file's the right type
//     cb(undefined, true);
//   },
// });

// const errorMiddleware = (req, res, next) => {
//   throw new Error("custom middleware error msg");
// };

// app.post(
//   "/upload",
//   upload.single("upload"),
//   (req, res) => {
//     res.send();
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   }
// );

app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));

// const pet = {
//   name: "hal",
// };

// this works the exact same way as the toJSON function in the UserSchema
// pet.toJSON = function () {
//   return {};
// };

// console.log(JSON.stringify(pet));

// const bcrypt = require("bcryptjs");

// const myF = async () => {
//   const pw = "1234";
//   const hash = await bcrypt.hash(pw, 8);

//   console.log(pw);
//   console.log(hash);

//   const isM = await bcrypt.compare(pw, hash);
//   console.log(isM);
// };

// myF();

// const jwt = require("jsonwebtoken");

// const myF2 = async () => {
//   const token = jwt.sign({ _id: "1234" }, "thisismynewcourse", {
//     expiresIn: "5 minutes",
//   });
//   console.log(token);

//   const payload = jwt.verify(token, "thisismynewcourse");
//   console.log(payload);
// };

// myF2();

// const Task = require("./models/Task");
// const User = require("./models/User");

// const main = async () => {
//   // const task = await Task.findById("6265845367058fd23a344d5d");
//   //using ref property from Task.js
//   // await task.populate("owner").execPopulate();
//   // console.log(task.owner);
//   // const user = await User.findById("6265a98c83405e1c1c2e4939");
//   // await user.populate("tasks");
// };

// main();
