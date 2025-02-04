const mongoose = require("mongoose")
const multer = require("multer")
const path = require("path")
const upload ="/upload"
const userSchema =mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true
    }
})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"..",upload))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname , '-' , Date.now())
    }
  })
userSchema.statics.imageUpload = upload;
userSchema.statics.multer = multer({ storage: storage }).single("image");
const userModel = mongoose.model("ishituser",userSchema);
module.exports = userModel;