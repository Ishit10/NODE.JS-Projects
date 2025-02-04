const express = require("express");
const connection = require("./config/db");
const userModel = require("./models/useModel")
const app = express();
const path = require("path")
const port = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/upload", express.static(path.join(__dirname, "/upload")));
app.get("/",async(req,res)=>{
    try {
     let userdata = await userModel.find({});
     console.log(userdata);
        res.render("form",{userdata})
    } catch (error) {
        console.log(error);
        res.render("form",{userdata})
    }
})
app.post("/add-data",userModel.multer , async (req, res) => {
    console.log(req.file);
    console.log(req.body);    
    try {
      if(req.file){
        req.body.image = userModel.imageUpload+"/"+req.file.filename;
      }
      await userModel.create(req.body);
      console.log("user Added");
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  });
  
app.get("/delete/:id",async(req,res)=>{
    let id = req.params.id;
    try {
        await userModel.findByIdAndDelete(id);
        console.log("user Deleted");
        res.redirect("/");
    } catch (error) {
        res.redirect("/")
    }
})
app.get("/edit/:id",async (req,res)=>{
    try {
    let userdata = await userModel.findById(req.params.id);
    res.render("editform", { userdata });
    } catch (error) {
        console.log(error);
    res.redirect("/");
    }
})
app.post("/update/:id", async (req, res) => {
    try {
      await userModel.findByIdAndUpdate(req.params.id, req.body);
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  });
app.listen(8081, (err) => {
    if (err) {
      console.log("Error starting the server:", err);
      return;
    }
    connection();
    console.log("Server is running on port 8081");
  });