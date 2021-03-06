const User = require("../models/user");
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
  console.log(req.params.profileId);
  const findUser = await User.findById(req.params.profileId).then((result) => {
    return result;
  });
  res.render("profile", {
    profile: findUser,
  });
};

const profile_post = async (req, res) => {
  console.log(req.body, req.file);
  const update = {
    name: req.body.name,
    birthdate: req.body.birthdate,
    email: req.body.email,
    hobbies: req.body.hobbies,
    bio: req.body.bio,
    img: req.file.filename,
  };
  const updateUser = await User.findOneAndUpdate(req.params.profileId, update);
  deleteImg(updateUser.img);
  console.log(updateUser);
  res.redirect("/profiles");
};

const profile_edit_get = (req, res) => {
  profileId = req.params.profileId;
  User.findById(profileId, done);
  function done(err, result) {
    res.render("edit", {
      profile: result,
    });
  }
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
