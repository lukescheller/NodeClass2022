const express = require("express");
const multer = require("multer");
const router = new express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const sharp = require("sharp");

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    // the program still seems to work even without saving
    // await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    //findByCredentials is a made up function - it's created within the user model
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    //token creation
    // const test = await user.thisFunction();
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((t) => {
      // if t.token is not equal to req.token the filter will continue
      return t.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }
  try {
    //when you want to update something while using bcrypt - use this method - the validation inside the userschema won't recognize updates

    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();
    // const user = await User.findByIdAndUpdate(id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    res.status(200).send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id);
    // if (!user) {
    //   return res.status(404).send("no user with this id found");
    // }

    await req.user.remove();
    res.status(201).send("user deleted:", req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

const upload = multer({
  //will create a new folder and the images will be sent there
  //when uploading to mongodb you can remove dest
  // dest: "avatars",
  limits: {
    //1 megabyte = 1 million bytes
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    //checks to see if filename doesn't end with either jpg...
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      //HOW TO CUSTOMIZE EXPRESS ERRORS..
      return cb(new Error("jpg, jpeg, or png only"));
    }
    //if the file has the correct extension it will upload it to the designated folder
    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    // req.user.avatar = req.file.buffer;
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  // fs.readFile("../defaultUser.jpg", async function (err, data) {
  //   if (err) {
  //     return new Error("default image is not working bruh.");
  //   }
  //   req.user.avatar = data;
  //   await req.user.save();
  //   res.send();
  // });
  req.user.avatar = "no img";
  await req.user.save();
  res.send();
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error("no profile pictures availabe");
    }
    //sends a header
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send({ error: error.message });
  }
});

module.exports = router;
