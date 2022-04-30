const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./Task");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      //unique makes sure that there can't be multiple emails that are the same
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("password cannot equal the word password");
        }
        if (value.length < 6) {
          throw new Error(
            "password cannot be less than 6 characters in length"
          );
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a positive number");
        }
      },
    },
    //this will be used when the user signs in from multiple devices and creates multiple tokens
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    //PROFILE IMAGAE
    avatar: {
      type: Buffer,
    },
  },
  {
    //set to false by default
    timestamps: true,
  }
);

//virtual
UserSchema.virtual("tasks", {
  ref: "task",
  localField: "_id",
  foreignField: "owner",
});

//test static function
// UserSchema.statics.staticFunction = () => {
//   console.log("static function testing from schema");
// };

// UserSchema.methods.thisFunction = async function () {
//   console.log("THIS FUNCTION", this);
// };

// no async on this one - we're not awaiting/saving anything
// this function still works even when you don't call it... why? - It works on all routes
// look into toJSON - this method is being called on all routes without explicitly being called
// toJSON might be a made up name...
UserSchema.methods.toJSON = function () {
  // for now it seems that you have to use toObject() with toJSON keyword for it to work - otherwise it'll most likely return nothing without the toObject()
  const userObject = this.toObject();
  // console.log(userObject);

  // delete keyword is new...
  // delete is used on objects - it deletes properties from objects
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

//token function - created within this file - accessible within user.js
//instance function - methods
//this is for instances
UserSchema.methods.generateAuthToken = async function () {
  // this - in the context of generateAuthToken being called refers to the object that's being created upon - new User

  // console.log("THIS", this);
  // const user = this
  // jwt is expecting a string for the id - hence the toString()
  // chances are what's passed to jwt.sign is what's contained within it
  const token = jwt.sign({ _id: this._id.toString() }, "thisismynewcourse");

  //{token: token} is the same as { token }
  this.tokens = this.tokens.concat({ token });
  //seems as if this.save() saves the new tokens that are put in the tokens array
  await this.save();

  return token;
};

//functions that you define within the schema are accessible within the instances of it that are called within different files
//model function - statics
//this is for the actual model
UserSchema.statics.findByCredentials = async (email, password) => {
  //{email: email} is equivilent to {email}
  // guess you can call User even though it's defined later
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("no user with this email exists");
  }

  const isM = await bcrypt.compare(password, user.password);

  //you don't want to be too specific with your error messages - just say something to the effect of 'invalid credentials'
  if (!isM) {
    throw new Error("passwords do not match");
  }

  return user;
};

//must be standard function, not arrow - arrow functions don't support 'this' yet
UserSchema.pre("save", async function (next) {
  // const user = this;
  // console.log("middleware testing", user);
  //isModified checks if a property was changed
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

//delete user tasks when user is removed
UserSchema.pre("remove", async function (next) {
  await Task.deleteMany({
    owner: this._id,
  });
  next();
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
