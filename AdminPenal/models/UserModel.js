const mongoose = require("mongoose");
const multer = require("multer");
const path  = require("path");
const upload = "/upload"

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  }
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", upload));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
userSchema.statics.imageUpload = upload;
userSchema.statics.multerImage = multer({ storage: storage }).single("image");

const UserModel = mongoose.model("user",userSchema)



module.exports = UserModel;