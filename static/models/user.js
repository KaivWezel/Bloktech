const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hobbies: {
    type: Array,
    required: true,
  },
  bio: {
    type: String,
  },
  img: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema, console.log("new user"));
