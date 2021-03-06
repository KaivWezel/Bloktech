require("dotenv/config")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const camelCase = require("camelcase")
const ejs = require("ejs")
const port = 4000
// const multer = require("multer")
const path = require("path")
const urlencodedParser = bodyParser.urlencoded({ extended: true })
const mongoose = require("mongoose")
const User = require("./models/user")
const fs = require("fs")
// const { ObjectId } = require("mongodb")
// const { callbackify } = require("util")
// const { profile, Console } = require("console")
// const { findOne } = require("./models/user")
const url = process.env.DB_HOST
const profileRoutes = require("./routes/profileRoutes")

//connect to mongodb with mongoose
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to Mongo")
  })
  .catch((err) => {
    console.log("error", err)
  })

app.use(profileRoutes)
//serve static files
app.use(express.static("static"))
app.use(urlencodedParser)
//set view engine
app.set("view engine", "ejs")

app.listen(port, () => {
  console.log(`listening at port ${port}`)
})

app.get("/", (req, res) => {
  res.render("index")
})

//profiles list
app.get("/profiles", (req, res) => {
  User.find().then((result) => {
    res.render("profiles", {
      profiles: result,
    })
  })
})

//404
app.use((req, res) => {
  res.status(404).send("this page does not exist.")
})

// User.remove({}, () => {
//   console.log("verwijderd")
// })
