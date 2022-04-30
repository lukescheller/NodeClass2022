const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    //make sure you don't forget the space after "Bearer "
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisismynewcourse");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("fucker");
    }
    // console.log("USER.TOKEN", user.tokens.token); - undefined
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "authorization required" });
  }
};

module.exports = auth;
