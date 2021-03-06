const User = require("../models/user")
//profile_create_get, profile_create_post, profile_get, profile_edit, profile_delete

const profile_create_get = (req, res) => {
  res.render("create")
}

const profile_create_post = (req, res) => {
  console.log(req.body)
  const newUser = new User({
    name: req.body.name,
    birthdate: req.body.birthdate,
    email: req.body.email,
    hobbies: req.body.hobbies,
    bio: req.body.bio,
    img: req.file.filename,
  })
  newUser.save().then((User) => {
    res.redirect(`/profile/${User.id}`)
  })
}

const profile_get = async (req, res) => {
  console.log(req.params.profileId)
  const findUser = await User.findById(req.params.profileId).then((result) => {
    return result
  })
  res.render("profile", {
    profile: findUser,
  })
}

module.exports = { profile_create_get, profile_create_post, profile_get }
