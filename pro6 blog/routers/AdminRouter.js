const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

router.get("/", (req, res) => res.redirect("/login"));
router.get("/login", AdminController.getLogin);
router.post("/login", AdminController.postLogin);
router.get("/register", AdminController.getRegister);
router.post("/register", AdminController.postRegister);
router.get("/dashboard", AdminController.getDashboard);
router.get("/profile", AdminController.getProfile);
router.get("/logout", AdminController.logout);

router.get("/delete-user/:id", AdminController.deleteUser);
router.get("/delete-product/:id", AdminController.deleteProduct);

router.get("/edit-user/:id", AdminController.getEditUser);
router.post("/update-user/:id", AdminController.updateUser);
router.get("/edit-product/:id", AdminController.getEditProduct);
router.post("/update-product/:id", AdminController.updateProduct);


module.exports = router;
