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
    try {
       
        await Movie.findByIdAndDelete(req.params.id);
        console.log("user Deleted");
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.redirect("/");
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
        let movie = await Movie.findById(req.params.id);
        if (req.file) {
            fs.unlinkSync(path.join(__dirname, movie.image));
            req.body.image = Movie.imageUpload + "/" + req.file.filename;
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
