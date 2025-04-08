const express = require("express");
const connected = require("./config/db");
const UserRouter = require("./routes/userRouter");
const auth = require("./middleware/auth");
const cors = require("cors")


const app = express();
require("dotenv").config();

app.use(express.json());

app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.use("/users", UserRouter);  
app.use(auth);

app.get("/products", (req, res) => {
  res.status(200).json({ message: "productpage" });
});
// app.use("products")

// app.get("/", (req, res) => {
//   res
//     .status(404)
//     .json({ message: "you have access of server", status: "success" });
// });

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log("server is not connected");
  } 
  connected();
  console.log("server is connected");
});