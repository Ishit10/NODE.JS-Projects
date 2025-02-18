const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const port = 8070;
const connection = require("./config/db");
const adminRouter = require("./routers/AdminRouter");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.use("/", adminRouter);

connection();

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
