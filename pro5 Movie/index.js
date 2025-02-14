const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 8060;
const connection = require("./config/db");
const Movie = require("./models/movieModel");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", async (req, res) => {
    try {
        let movies = await Movie.find({});
        res.render("movies", { movies });
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

app.get("/form", (req, res) => {
    res.render("form"); 
});

app.post("/addMovie", Movie.multerImage, async (req, res) => {
    try {
        if (req.file) {
            req.body.image = Movie.imageUpload + "/" + req.file.filename;
        }
        await Movie.create(req.body);
        res.redirect("/");
    } catch (e) {
        console.log(e);
        res.redirect("/");
    }
});

app.get("/deleteMovie/:id", async (req, res) => {
    const id = req.params.id;
    const  movieData = await Movie.findById(id);
    console.log(id);
    try {
      if (movieData) {
        fs.unlinkSync(path.join(__dirname + movieData.image)); // delete the file if exists before deleting the document in MongoDB.  //fs.unlinkSync(path.join(__dirname, "/uploads", userData.image));  // delete the file from the specified path.  //fs.rmdirSync(path.join(__dirname, "/uploads"));  // delete the directory if exists before deleting the document in MongoDB.  //fs.rmdirSync(path.join(__dirname, "/uploads", userData.image.split("/")[1]), { recursive: true });  // delete the directory from the specified path and its subdirectories.  //fs.renameSync(path.join(__dirname, "/uploads", userData.image), path.join(__dirname, "/uploads", req.body.image));  // rename the file.  //fs.renameSync(path.join(__dirname, "/uploads", userData.image.split("/")[1]), path.join(__
      }
      await Movie.findByIdAndDelete(id);
      console.log("user deleted successfully");
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.redirect("back");
    }
});

app.get("/editMovie/:id", async (req, res) => {
    try {
        let movie = await Movie.findById(req.params.id);
        res.render("editMovie", { movie });
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

app.post("/updateMovie/:id", Movie.multerImage, async (req, res) => {
    
    try {
        let movieData = await Movie.findById(req.params.id);
        if (req.file) {
            fs.unlinkSync(path.join(__dirname + movieData.image));
            req.body.image = Movie.imageUpload + "/" + req.file.filename;
            console.log(req.body);
        }
        await Movie.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

app.listen(port, (err) => {
    if (err) {
        console.log("Error starting the server:", err);
        return;
    }
    connection();
    console.log(`Server is running on port ${port}`);
});
