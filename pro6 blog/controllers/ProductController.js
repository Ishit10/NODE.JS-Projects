const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render("dashboard", { user: req.cookies.user, products });
    } catch (error) {
        console.error(error);
        res.render("dashboard", { user: req.cookies.user, products: [] });
    }
};

exports.getAddProduct = (req, res) => {
    res.render("addProduct", { error: null });
};

exports.postAddProduct = async (req, res) => {
    const { name, price, description } = req.body;

    try {
        const newProduct = new Product({ name, price, description });
        await newProduct.save();
        res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
        res.render("addProduct", { error: "Failed to add product" });
    }
};
