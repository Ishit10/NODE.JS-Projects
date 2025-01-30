const express = require("express");
const path = require("path");
const { setAuth, condition } = require("./middleware/middleware");


const app = express();
const port = 2353;


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  return res.render("login");
});

app.post("/userData", (req, res) => {
  const { user } = req.body;
  if (!user) {
    return res.send("Not authorized. Please fill in the username.");
  }
  setAuth(true); 
  return res.redirect("/about"); 
});
app.use(condition)

app.get("/about", (req, res) => {
  return res.send("Welcome to the About page!");
});

app.get("/contact", (req, res) => {
  return res.send("Contact page");
});

app.listen(port, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(`Server running on port ${port}`);
});
