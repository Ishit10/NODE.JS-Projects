
const express = require("express");
const port = 2025;
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

let record = [];
app.get("/", (req, res) => {
  return res.render("form", { record });
});

app.post("/addData", (req, res) => {
  const { userName } = req.body;
  record.push(userName);
  return res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  console.log(req.params.id);
  let id = req.params.id;

  record = record.filter((element, i) => i != id);

  return res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  let data = record[id];
  console.log(data);
  res.render("edit", { data, id });
});

app.post("/updateData", (req, res) => {
  console.log(req.body);
  record[req.body.id] = req.body.userName;
  return res.redirect("/");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server is running on port ${port}`);
});
