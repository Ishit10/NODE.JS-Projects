 

  const express = require("express");
  const UserModel = require("../models/UserModel");
  const dashboardRouter = express.Router();
  const fs = require("fs");
  const multer = require("multer");
  const path = require("path");
  const bcrypt = require("bcryptjs");
  const passport = require("../middleware/passportlocal");
  const nodemailer = require('nodemailer');
const ProductModel = require("../models/ProductModels");
const SubProductModel = require("../models/SubProduct");
const ExtraSubProductsModel = require("../models/extraSubCategory");
  dashboardRouter.get("/dashboard", passport.auth, (req, res) => {
    res.render("dashboard");
  });
  dashboardRouter.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
  });

  dashboardRouter.get("/deleteData/:id", async (req, res) => {
    const id = req.params.id;
    const userData = await UserModel.findById(id);
    console.log(userData);
    // return
    try {
      if (userData) {
        fs.unlinkSync(path.join(__dirname + "/.." + userData.image));
      }
      await UserModel.findByIdAndDelete(id);
      console.log("user deleted successfully");
      res.redirect("/userTable");
    } catch (err) {
      console.log(err);
      res.redirect("back");
    }
  });
  dashboardRouter.get("/", (req, res) => {
    let getData = req.cookies.userData
    // if(!getData){
    // }else{
    //   res.render("dashboard")
    // }
    res.render("login");
  });

  dashboardRouter.get("/signup", (req, res) => {
    // let getData = req.cookies.userData
    // if(!getData){
    // }else{
    //   res.render("dashboard")
    // }
    res.render("signup");
  });

  dashboardRouter.get("/editData/:id", async (req, res) => {
    try {
      let userData = await UserModel.findById(req.params.id);
      res.render("editForm", { userData });
    } catch (error) {
      console.log(error);
      res.redirect("back");
    }
  });

  dashboardRouter.post(
    "/updateData/:id",
    UserModel.multerImage,
    async (req, res) => {
      try {
        let userData = await UserModel.findById(req.params.id);
        console.log(req.file);
        if (req.file) {
          fs.unlinkSync(path.join(__dirname + "/.." + userData.image));
          req.body.image = UserModel.imageUpload + "/" + req.file.filename;
        }

        await UserModel.findByIdAndUpdate(req.params.id, req.body);
        console.log("user updated successfully");
        res.redirect("/userTable");
      } catch (error) {
        console.log(error);
        res.redirect("back");
      }
    }
  );
  dashboardRouter.post("/createData", UserModel.multerImage, async (req, res) => {
    console.log(req.body);

    try {
      console.log(req.file);
      if (req.file) {
        req.body.image = UserModel.imageUpload + "/" + req.file.filename;
      }
      await UserModel.create(req.body);
      console.log("user created successfully");
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.redirect("back");
    }
  });

  dashboardRouter.get("/userTable", passport.auth, async (req, res) => {
    try {
      const getUsers = await UserModel.find({});
      // console.log(getUsers);
      res.render("userTable", { getUsers });
    } catch (error) {
      console.log(error);
    }
  });

  dashboardRouter.get("/addProducts", passport.auth, async (req, res) => {
    res.render("addProducts");
  });

  dashboardRouter.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/" }),
    async (req, res) => {
      try {
        req.flash("success", "login Successfully");
        return res.redirect("/dashboard");
      } catch (err) {
        req.flash("error", "invalid login");
        console.log(err);
      }
    }
  );

  dashboardRouter.get("/changePass" , passport.auth ,(req,res)=>{
    res.render("changePass")
  })
  
  dashboardRouter.post("/updatepass",passport.auth, async (req,res)=>{
    try {
      const {old_password,new_password,Confirm_new_password}=req.body;
      const user = await UserModel.findById(req.user._id);
      if(old_password !== req.user.password){
        console.log("not same")
        return
      }
      if (new_password !== Confirm_new_password) {
        console.log("New Pass Not Same");
        return
      }
  
        user.password = new_password;
          await user.save();
          res.redirect("/dashboard");
      
    } catch (error) {
      console.log(error);
    }
  })
  // zeua xaiz zdvz mvnz
  // kapuparaishit18@gmail.com
  
 
  dashboardRouter.post("/otpCheck", async (req, res) => {
    let getData = await UserModel.findOne({ email: req.body.otpEmail });
    if (getData) {
        let otp = Math.floor(Math.random() * 10000);
        
        res.cookie("storeOtp", otp);
        res.cookie("email", req.body.otpEmail); 

        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "kapuparaishit18@gmail.com",
                pass: "zeua xaiz zdvz mvnz",
            },
        });

        var mailOptions = {
            from: "kapuparaishit18@gmail.com",
            to: req.body.otpEmail,
            subject: "OTP",
            text: `OTP ${otp}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
            res.render("otpPage");
        });
    } else {
        console.log("User not found in database");
        res.redirect("/");
    }
});

  

    dashboardRouter.get("/otpVerify", async (req, res) => {
      console.log(req.cookies.otp);
      res.render("otpPage");
      return;
    });
    
    dashboardRouter.post("/otpVerify", async (req, res) => {
      try {
        console.log("Stored OTP:", req.cookies.storeOtp);
        console.log("Entered OTP:", req.body.otpver);
    
        if (!req.cookies.storeOtp) {
          console.log("OTP not found in cookies!");
          return res.status(400).send("OTP expired or missing");
        }
    
        if (req.cookies.storeOtp !== req.body.otpver) {
          console.log("OTP does not match!");
          return res.status(400).send("Invalid OTP");
        }
    
        console.log("OTP Verified Successfully!");
        res.redirect("/changepasswordpage");
      } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
      }
    });
    
    
    dashboardRouter.get("/changepasswordpage", (req, res) => {
      res.render("changepasswordpage");
    });
    
    dashboardRouter.post("/otppass", async (req, res) => {
      try {
        const { newpassword, confirmnewpassword } = req.body;
        console.log(newpassword, confirmnewpassword);
    
        const email = req.cookies.email; 
        if (!email) {
          console.log("Email not found in cookies.");
          return res.redirect("/changepasswordpage");
        }
    
        const user = await UserModel.findOne({ email });
        if (!user) {
          console.log("User not found");
          return res.redirect("/changepasswordpage");
        }
    
        if (newpassword !== confirmnewpassword) {
          console.log("New Pass Not Same");
          return res.redirect("/changepasswordpage");
        }
    
        user.password = newpassword; 
        await user.save();
    
        console.log("Password updated successfully!");
        res.redirect("/");
      } catch (error) {
        console.log(error);
        res.redirect("/changepasswordpage");
      }
    });

    dashboardRouter.post("/addProduct", async (req, res) => {
      try {
        await ProductModel.create(req.body);
        req.flash("success", "Product added successfully");
        console.log("product created successfully");
        res.redirect("/dashboard");
      } catch (err) {
        console.log(err);
        res.redirect("back");
      }
    });

    dashboardRouter.post("/addSubProduct", async (req, res) => {});

dashboardRouter.get("/addSubProducts", async (req, res) => {
  try {
    const getProducts = await ProductModel.find({});
 
    res.render("addSubProducts", { getProducts });
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
});


dashboardRouter.get("/subProductTable", passport.auth, async (req, res) => {
  try {
    const getSubProducts = await SubProductModel.find().populate("productId").exec();
    console.log(getSubProducts);
    res.render("subProductTable", { getSubProducts });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
})

dashboardRouter.post("/createSubProduct", async (req, res) => {
  console.log(req.body);

  try{
    await SubProductModel.create(req.body)
   
    console.log("sub product created")
    res.redirect("/dashboard");
  }catch (err) {
    console.log(err);
    res.redirect("back");
  }
})




dashboardRouter.post("/addExtraSubProducts", async (req, res) => {});

dashboardRouter.get("/addExtraSubProducts", async (req, res) => {
  try {
    const getProducts = await ProductModel.find({});
    const getSubProducts = await SubProductModel.find({});
 
    res.render("addExtraSubProducts", { getProducts,getSubProducts });
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
});


dashboardRouter.get("/extraSubProductTable", passport.auth, async (req, res) => {
  try {
    const getExtraSubProducts = await ExtraSubProductsModel.find().populate("productId").populate("subProductid").exec();
    // console.log(getExtraSubProducts);
    // return;
    res.render("extraSubProductTable", { getExtraSubProducts });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
})

dashboardRouter.post("/createExtraSubProduct", async (req, res) => {
  console.log(req.body);
// return;
  try{
    await ExtraSubProductsModel.create(req.body)
   
    console.log("extra sub product created")
    res.redirect("/dashboard");
  }catch (err) {
    console.log(err);
    res.redirect("back");
  }
})




  module.exports = dashboardRouter;