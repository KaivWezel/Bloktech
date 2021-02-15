const express = require("express");
const ejs = require("ejs");
const app = express();
const port = 3000;

app.use(express.static("static"));

app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/static/contact.html");
});

app.get("/profile/:name", (req, res) => {
  res.render("profile", {
    name: req.params.name,
    hobbies: ["reizen", "koken", "sport", "knutselen", "gamen"],
  });
});

app.use(function (req, res) {
  res.status(404).send("this page does not exist.");
});
