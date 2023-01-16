const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3500;
const conDB = require("./config/conDb");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");

const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000",
};

//DataBase connection
conDB();
//cors
app.use(cors(corsOptions));

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname)));
app.use("/uploads", express.static("uploads"));

app.use(morgan("dev"));

//routes
app.use("/api/auth", require("./routes/AuthRoute"));
app.use("/api/post", require("./routes/PostRoute"));

mongoose.connection.once("open", () => {
    console.log("Connected to DataBase");
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
});