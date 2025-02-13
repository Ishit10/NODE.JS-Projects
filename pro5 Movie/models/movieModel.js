const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const upload = "/uploads"

const movieSchema = new mongoose.Schema({
  title:{
   type: String,
    required:true,
  },
  genre: {
    type: String,
     required:true,
   },
  rating:{
    type: String,
     required:true,
   },
  image: {
    type: String,
     required:true,
   },
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"..",upload))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname , '-' , Date.now())
    }
  })
  movieSchema.statics.imageUpload = upload;
movieSchema.statics.multerImage = multer({ storage: storage }).single("image");
const userModel = mongoose.model("movie",movieSchema);
module.exports = userModel;
