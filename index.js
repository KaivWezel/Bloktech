const express = require("express");
const app = express();
const camelCase = require("camelcase");
const ejs = require("ejs");
const port = 4000;
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
// const fs = require("fs");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
require("dotenv/config");
const mongoose = require("mongoose");
// const MongoClient = require("mongodb").MongoClient;
const user = require("./static/models/user");
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
  destination: "./static/public/uploads/",
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

//get form
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile", (req, res) => {
  res.render("profile", { bio: "Hier komt je bio" });
});

app.post(
  "/who",
  urlencodedParser,
  (req, res, next) => {
    res.render("profile");
    console.log(req.body);
    next();
  },
  (req, res) => {
    const newUser = new user({
      name: camelCase(req.body.name, { pascalCase: true }),
      birthdate: req.body.birthdate,
      email: req.body.email,
    });
    newUser.save((err) => {
      if (err) {
        console.log(err);
      }
    });
  }
);

app.post("/upload", upload.single("upload"), (req, res) => {
  console.log(req.file);
});

//404
app.use(function (req, res) {
  res.status(404).send("this page does not exist.");
});
