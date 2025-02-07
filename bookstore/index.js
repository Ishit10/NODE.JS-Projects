const express = require("express");
const path = require("path");
const app = express();
const port = 8090;
const connection = require("./config/db");
const useModel = require("./models/useModel");



app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.get("/", async (req, res) => {
  try {
    let userData = await useModel.find({});
    console.log(userData);
    res.render("form", { userData }); 
  } catch (err) {
    console.log(err);
    res.render("/");
  }
});

app.post("/addData", useModel.multerImage, async (req, res) => {
  

  try {
    if (req.file) {
      req.body.image = useModel.imageUpload + "/" + req.file.filename;
    }
    await useModel.create(req.body);
    console.log("user created successfully");
    res.redirect("/");
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

app.get("/deleteData/:id",async(req,res)=>{
    let id = req.params.id;
    try {
        await useModel.findByIdAndDelete(id);
        console.log("user Deleted");
        res.redirect("/");
    } catch (error) {
        res.redirect("/")
    }
})

app.get("/editData/:id", async (req, res) => {
  try {
    let userData = await useModel.findById(req.params.id);

    res.render("editForm", { userData });
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
});

app.post("/updateData/:id", useModel.multerImage, async (req, res) => {
  try {
    let userData = await useModel.findById(req.params.id);
console.log(req.file)
    if (req.file) {
      fs.unlinkSync(path.join(__dirname + userData.image));
      req.body.image = useModel.imageUpload + "/" + req.file.filename;
    }

    await useModel.findByIdAndUpdate(req.params.id, req.body);
    console.log("user updated successfully");
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
});



app.listen(port, (err) => {
    if (err) {
      console.log("Error starting the server:", err);
      return;
    }
    connection();
    console.log("Server is running on port 8090");
  });