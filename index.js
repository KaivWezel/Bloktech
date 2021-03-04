require('dotenv/config')
const express = require('express')
const app = express()
const camelCase = require('camelcase')
const ejs = require('ejs')
const port = 4000
const multer = require('multer')
const path = require('path')
const urlencodedParser = express.urlencoded({ extended: true })
const mongoose = require('mongoose')
const User = require('./static/models/user')
const fs = require('fs')
const { ObjectId } = require('mongodb')
const { callbackify } = require('util')
const { profile } = require('console')
const url = process.env.DB_HOST

//connect to mongodb with mongoose
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to Mongo')
  })
  .catch((err) => {
    console.log('error', err)
  })

//set storageengine Multer
const storage = multer.diskStorage({
  destination: './static/uploads/',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  },
})

//init upload
const upload = multer({ storage: storage })

//serve static files
app.use(express.static('static'))

//set view engine
app.set('view engine', 'ejs')

app.listen(port, () => {
  console.log(`listening at port ${port}`)
})

//get create profile
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/profile/create', (req, res) => {
  res.render('create')
})

// current user Id storage
let profileId

//receive created profile
app.post(
  '/profile/create',
  urlencodedParser,
  upload.single('upload'),
  (req, res, next) => {
    const newUser = new User({
      name: req.body.name,
      birthdate: req.body.birthdate,
      email: req.body.email,
      hobbies: req.body.hobbies,
      bio: req.body.bio,
      img: req.file.filename,
    })
    newUser
      .save()
      .then((user) => {
        profileId = user.id
      })
      .then(() => {
        next()
      })
  },
  (req, res) => {
    User.findById(profileId, done)
    function done(err, result) {
      console.log('gevonden')
      res.render('profile', {
        profile: result,
      })
    }
  }
)

//edit profile
app.get('/profile/edit/:profileId', (req, res) => {
  profileId = req.params.profileId
  User.findById(profileId, done)
  function done(err, result) {
    res.render('edit', {
      profile: result,
    })
  }
})

//profiles list
app.get('/profiles', (req, res, profiles) => {
  User.find().then((result) => {
    res.render('profiles', {
      profiles: result,
    })
  })
})

//request for selected profile
app
  .get('/profile/:profileId', async (req, res) => {
    profileId = req.params.profileId
    const findUser = await User.findById(profileId).then((result) => {
      return result
      console.log(result)
    })
    res.render('profile', {
      profile: findUser,
    })
  })
  //update request
  .post('/profile/:profileId', urlencodedParser, (req, res) => {
    console.log('ontvangen')
    profileId = req.params.profileId
    console.log(req.body)
  })

//404
app.use((req, res) => {
  res.status(404).send('this page does not exist.')
})

// user.remove({}, () => {
//   console.log('verwijderd')
// })
