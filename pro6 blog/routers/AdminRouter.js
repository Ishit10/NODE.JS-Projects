const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

router.get("/", (req, res) => {
    res.redirect("/login");
});

router.get("/login", AdminController.getLogin);
router.post("/login", AdminController.postLogin);

router.get("/register", AdminController.getRegister);
router.post("/register", AdminController.postRegister);

router.get("/admin", AdminController.getAdmin);
router.get("/logout", AdminController.logout);

module.exports = router;
