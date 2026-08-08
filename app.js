const express = require("express");
const app = express();
const errorMiddleware = require("./middleWare/error");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
require("dotenv").config({ path: "./config/config.env" });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});







// routes

const user = require("./route/userRoute");
const order = require("./route/orderRoute");
const product = require("./route/productRoute")
const payment = require("./route/paymentRoute");

// for req.cookie to get token while autentication
app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);



app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

const __dirname1 = path.resolve();

app.use(express.static(path.join(__dirname1, "/frotend/build")));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.resolve(__dirname1, "frotend", "build", "index.html"));
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorMiddleware);

module.exports = app;