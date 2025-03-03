const express = require("express");
const app = express();
const path = require("path");
const passportlocal = require('passport')
const passport = require("./middleware/passportlocal");
const userModel = require("./models/userModel");
const connection = require("./config/db");
const session = require("express-session");

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setUser);


app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


app.get("/register", (req, res) => {

       res.render("register");
});

app.post("/createData", async (req, res) => {
  console.log(req.body);
  try {
    await userModel.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password, 
    });
    console.log("user Added");
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
app.post("/", async (req, res) => {
  try {
    const getLoginData = await userModel.findOne({
      userName: req.body.userName,
    });
    console.log(getLoginData);
    if (getLoginData.password === req.body.password) {
      res.redirect("/admin");
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});
app.get("/", (req, res) => {

res.render("login")
});

app.get("/admin", passport.auth, (req, res) => {
  res.render("admin");
});


  app.post("/login",passport.authenticate("local", {
      successRedirect: "/admin",
      failureRedirect: "/",
    })
  );
  

app.listen(8078, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  connection();
  console.log("Server is running on port 8078");
});