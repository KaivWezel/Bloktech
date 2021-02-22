const mongoose = require("mongoose");
require("dotenv/config");

// Replace the following with your Atlas connection string
const url = process.env.DB_HOST;

//connect to mongodb

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to Mongo");
  })
  .catch((err) => {
    console.log("error", err);
  });

const db = mongoose.connection;
const col = db.collections.users;

const userSchema = new mongoose.Schema({
  name: String,
});

const User = mongoose.model("User", userSchema);

const userOne = new User({ name: "Harry" });

console.log(userOne);
userOne.save(function (err, userOne) {
  if (err) {
    console.log(err);
  }
});
// console.log(User.findById("602fa32ec2f19c02a9d93693"));
