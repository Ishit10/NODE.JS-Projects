const express = require("express");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
  // console.log(req.body);
  // return
  let { name, email, password } = req.body;
  // create user
  try {
    const existEmail = await UserModel.findOne({ email: req.body.email });
    if(!existEmail){
      password = await bcrypt.hash(password, 10);
    await UserModel.create({ email, password, name });
    res.status(201).json({ message: "User created successfully" });
    }else {
      res.status(200).json({ message: "This email already exists" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    if ( await bcrypt.compare(password, user.password)) {
      let token = jwt.sign({ user }, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });
      res.status(200).json({
        message: "Login successfully",
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid Password" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

UserRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


UserRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

UserRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    await UserModel.findByIdAndUpdate(id, { name, email, password });
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = UserRouter;