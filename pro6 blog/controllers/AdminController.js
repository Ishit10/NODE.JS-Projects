const User = require("../models/User");

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
        res.redirect("/admin");
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

exports.getAdmin = (req, res) => {
    if (!req.cookies.user) {
        return res.redirect("/login");
    }
    res.render("admin", { user: req.cookies.user });
};

exports.logout = (req, res) => {
    res.clearCookie("user");
    res.redirect("/login");
};
