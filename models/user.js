const mongoose = require('mongoose');

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
  },
});

module.exports = mongoose.model(
  'tank',
  userSchema,
  console.log('User model loaded')
);
