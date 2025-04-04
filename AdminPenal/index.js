const express = require("express");
const app = express();
const path = require("path");
const dashboardRouter = require("./routers/dashboardRouter");
const connection = require("./config/db");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const connectFlash = require("./middleware/connectFlash");

require("dotenv").config();


app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/upload", express.static(path.join(__dirname, "/upload")));
app.use(
  session({
    secret: "vinit",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setUser);
app.use(flash())
app.use(connectFlash.setFlash);

app.use("/", dashboardRouter);
app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log("server is not running");
    return;
  }
  connection();
  console.log(`server is running ${process.env.PORT}`);
});