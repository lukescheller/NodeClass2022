const mongoose = require("mongoose");
const config = require("config");
const db = config.get("MongoDB");

const DB_CONNECTION = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: true, - depricated
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection established");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = DB_CONNECTION;
