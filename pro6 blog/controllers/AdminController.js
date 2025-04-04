const User = require("../models/User");
const Product = require("../models/Product");

exports.getLogin = (req, res) => {
    res.render("login", { error: null });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.render("login", { error: "Invalid email or password" });
        }

        res.cookie("user", { email }, { httpOnly: true });
        console.log(req.cookies.user);
        res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
        res.render("login", { error: "Login failed" });
    }
};

exports.getRegister = (req, res) => {
    res.render("register", { error: null });
};

exports.postRegister = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render("register", { error: "Email already exists" });
        }

        const newUser = new User({ email, password });
        await newUser.save();

        res.redirect("/login");
    } catch (error) {
        console.error(error);
        res.render("register", { error: "Registration failed" });
    }
};

exports.getDashboard = async (req, res) => {
    if (!req.cookies.user) {
        return res.redirect("/login");
    }

    try {
        const products = await Product.find();
        res.render("dashboard", { user: req.cookies.user, products });
    } catch (error) {
        console.error(error);
        res.render("dashboard", { user: req.cookies.user, products: [] });
    }
};

exports.getProfile = async (req, res) => {
    if (!req.cookies.user) {
        return res.redirect("/login");
    }

    try {
        const users = await User.find();
        const products = await Product.find();
        res.render("profile", { user: req.cookies.user, users, products });
    } catch (error) {
        console.error(error);
        res.render("profile", { user: req.cookies.user, users: [], products: [] });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect("/profile");
    } catch (error) {
        console.error(error);
        res.redirect("/profile");
    }
};

exports.getEditUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render("editUser", { user });
};

exports.updateUser = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { email: req.body.email });
    res.redirect("/profile");
};

exports.getEditProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("editProduct", { product });
};

exports.updateProduct = async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, { name: req.body.name, price: req.body.price });
    res.redirect("/profile");
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect("/profile");
    } catch (error) {
        console.error(error);
        res.redirect("/profile");
    }
};

exports.logout = (req, res) => {
    res.clearCookie("user");
    res.redirect("/login");
};
