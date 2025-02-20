const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.get("/add", ProductController.getAddProduct);
router.post("/add", ProductController.postAddProduct);

module.exports = router;
