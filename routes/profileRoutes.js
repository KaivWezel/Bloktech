const express = require("express")

const router = express.Router()

require("dotenv/config")
const app = express()
const bodyParser = require("body-parser")
const camelCase = require("camelcase")
const ejs = require("ejs")
const port = 4000
const multer = require("multer")
const path = require("path")
const urlencodedParser = bodyParser.urlencoded({ extended: true })
const mongoose = require("mongoose")
const User = require("../models/user")
const fs = require("fs")
const { ObjectId } = require("mongodb")
const { callbackify } = require("util")
const { profile, Console } = require("console")
const { findOne } = require("../models/user")
const url = process.env.DB_HOST

//set storageengine Multer
const storage = multer.diskStorage({
  destination: "./static/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    )
  },
})

//init upload
const upload = multer({ storage: storage })

//get create profile
router.get("/profile/create", (req, res) => {
  res.render("create")
})

// current user Id storage
let profileId

// receive created profile
router.post(
  "/profile/create",
  urlencodedParser,
  upload.single("upload"),
  (req, res, next) => {
    console.log(req.body)
    const newUser = new User({
      name: req.body.name,
      birthdate: req.body.birthdate,
      email: req.body.email,
      hobbies: req.body.hobbies,
      bio: req.body.bio,
      img: () => {
        return req.file.filename ? req.file.filename : ""
      },
    })
    newUser.save().then((User) => {
      profileId = User.id
      next()
    })
  },
  (req, res) => {
    res.redirect(`/profile/${profileId}`)
  }
)

//DELETE PROFILE
router.get(
  "/profile/delete/:profileId",
  async (req, res, next) => {
    const findUser = await User.findById(req.params.profileId).then(
      (result) => {
        deleteImg(result.img)
        return result
      }
    )
    const deletedUser = await User.deleteOne({ _id: findUser._id }).then(() => {
      console.log("deleted profile")
    })
    next()
  },
  (req, res) => {
    User.find().then((result) => {
      res.redirect("/profiles")
    })
  }
)

//edit profile
router.get("/profile/edit/:profileId", (req, res) => {
  profileId = req.params.profileId
  User.findById(profileId, done)
  function done(err, result) {
    res.render("edit", {
      profile: result,
    })
  }
})

//request for selected profile
router.get("/profile/:profileId", async (req, res) => {
  console.log(req.params.profileId)
  const findUser = await User.findById(req.params.profileId).then((result) => {
    return result
  })
  res.render("profile", {
    profile: findUser,
  })
})

//update request
router.post(
  "/profile/:profileId",
  urlencodedParser,
  upload.single("upload"),
  async (req, res) => {
    console.log(req.body, req.file)
    const update = {
      name: req.body.name,
      birthdate: req.body.birthdate,
      email: req.body.email,
      hobbies: req.body.hobbies,
      bio: req.body.bio,
      img: req.file.filename,
    }
    const updateUser = await User.findOneAndUpdate(req.params.profileId, update)
    deleteImg(updateUser.img)
    console.log(updateUser)
    res.redirect("/profiles")
  }
)

//function to delete old profile picture
const deleteImg = (fileName) => {
  try {
    fs.unlinkSync("static/uploads/" + fileName)
    console.log("succesfully deleted")
  } catch (err) {
    console.log(err)
  }
}

module.exports = router
