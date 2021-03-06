const express = require("express");

const router = express.Router();

require("dotenv/config");
const bodyParser = require("body-parser");
const multer = require("multer");
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const mongoose = require("mongoose");
const User = require("../models/user");
const fs = require("fs");
const path = require("path");
const { ObjectId } = require("mongodb");
const { callbackify } = require("util");
const { profile, Console } = require("console");
const { findOne } = require("../models/user");
const url = process.env.DB_HOST;
const profileController = require("../controllers/profileControllers");

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

//get create profile
router.get("/profile/create", profileController.profile_create_get);

// current user Id storage
let profileId;

// receive created profile
router.post(
  "/profile/create",
  urlencodedParser,
  upload.single("upload"),
  profileController.profile_create_post
);
//DELETE PROFILE
router.get("/profile/delete/:profileId", profileController.profile_delete);

//edit profile
router.get("/profile/edit/:profileId", profileController.profile_edit_get);

//request for selected profile
router.get("/profile/:profileId", profileController.profile_get);

//update request
router.post(
  "/profile/:profileId",
  urlencodedParser,
  upload.single("upload"),
  profileController.profile_post
);

module.exports = router;
