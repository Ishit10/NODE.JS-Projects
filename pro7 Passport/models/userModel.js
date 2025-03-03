const mongoose = require("mongoose")
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
password:{
type:String,
required:true,
}
})

const userModel = mongoose.model("ishituser",userSchema);
module.exports = userModel;