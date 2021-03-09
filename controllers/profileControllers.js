const User = require("../models/user");
const fs = require("fs");
const user = require("../models/user");
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

const profile_update = async (req, res) => {
  let updateUser = await User.findById(req.params.profileId).then((User) => {
    return User;
  });
  const checkImg = () => {
    if (req.file == undefined) {
      console.log("geen img");
    } else {
      console.log("wel img");
      deleteImg(updateUser.img);
    }
  };
  checkImg();
  const update = {
    name: req.body.name,
    birthdate: req.body.birthdate,
    email: req.body.email,
    hobbies: req.body.hobbies,
    bio: req.body.bio,
    img: req.file ? req.file.filename : updateUser.img,
  };
  await User.updateOne({ _id: req.params.profileId }, update);
  user.findById(req.params.profileId).then((User) => {
    console.log(User);
  });
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
  profile_update,
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
