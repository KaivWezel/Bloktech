require("dotenv/config");
const express = require("express");
const app = express();
const camelCase = require("camelcase");
const ejs = require("ejs");
const port = 4000;
const multer = require("multer");
const path = require("path");
const urlencodedParser = express.urlencoded();
const mongoose = require("mongoose");
const user = require("./static/models/user");
const fs = require("fs");
const { ObjectId } = require("mongodb");
const { callbackify } = require("util");
const url = process.env.DB_HOST;

//connect to mongodb with mongoose
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

//set storageengine Multer
const storage = multer.diskStorage({
  destination: "./static/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//init upload
const upload = multer({ storage: storage });

//serve static files
app.use(express.static("static"));

//set view engine
app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});

//get create profile
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile/create", (req, res) => {
  res.render("create");
});

// current user Id storage
let currentUserId;

//receive created profile
app.post(
  "/profile/create",
  urlencodedParser,
  upload.single("upload"),
  (req, res, next) => {
    const newUser = new user({
      name: req.body.name,
      birthdate: req.body.birthdate,
      email: req.body.email,
      hobbies: req.body.hobbies,
      bio: req.body.bio,
      img: req.file.filename,
    });
    newUser.save((err, user) => {
      if (err) {
        console.log(err);
      } else {
        currentUserId = user.id;
        console.log(currentUserId);
      }
    });
    next();
  },
  (req, res) => {
    res.render("profile", {
      profile: req.body,
    });
  }
);

//edit profile
app.post("/profile/edit", (req, res) => {
  let currentUser;
  user.findById(currentUserId).then((result) => {
    console.log("gevonden");
    currentUser = result;
    console.log(currentUser);
  });
  res.send(JSON.stringify(currentUser));
});

//404
app.use((req, res) => {
  res.status(404).send("this page does not exist.");
});

// user.remove({}, () => {
//   console.log("verwijderd");
// });
