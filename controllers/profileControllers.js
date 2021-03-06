const User = require("../models/user");
const fs = require("fs");
//profile_create_get, profile_create_post, profile_get, profile_edit, profile_delete

const profile_create_get = (req, res) => {
  res.render("create");
};

const profile_create_post = (req, res) => {
  console.log(req.body);
  const newUser = new User({
    name: req.body.name,
    birthdate: req.body.birthdate,
    email: req.body.email,
    hobbies: req.body.hobbies,
    bio: req.body.bio,
    img: req.file.filename,
  });
  newUser.save().then((User) => {
    res.redirect(`/profile/${User.id}`);
  });
};

const profile_get = async (req, res) => {
  const findUser = await User.findById(req.params.profileId).then((result) => {
    return result;
  });
  res.render("profile", {
    profile: findUser,
  });
};

const profile_post = async (req, res) => {
  const update = {
    name: req.body.name,
    birthdate: req.body.birthdate,
    email: req.body.email,
    hobbies: req.body.hobbies,
    bio: req.body.bio,
    img: req.file.filename,
  };
  console.log(req.params.profileId);
  console.log(req.body);
  const updateUser = await User.findOneAndUpdate(
    { _id: req.params.profileId },
    update
  ).then((result) => {
    return result;
  });
  deleteImg(updateUser.img);
  res.redirect("/profiles");
};

const profile_edit_get = async (req, res) => {
  const findUser = await User.findById(req.params.profileId).then((result) => {
    return result;
  });
  res.render("edit", {
    profile: findUser,
  });
};

const profile_delete = async (req, res, next) => {
  const findUser = await User.findById(req.params.profileId).then((result) => {
    deleteImg(result.img);
    return result;
  });
  const deletedUser = await User.deleteOne({ _id: findUser._id }).then(() => {
    console.log("deleted profile");
  });
  res.redirect("/profiles");
};

module.exports = {
  profile_create_get,
  profile_create_post,
  profile_get,
  profile_post,
  profile_edit_get,
  profile_delete,
};

//function to delete old profile picture
const deleteImg = (fileName) => {
  try {
    fs.unlinkSync("static/uploads/" + fileName);
    console.log("succesfully deleted");
  } catch (err) {
    console.log(err);
  }
};
