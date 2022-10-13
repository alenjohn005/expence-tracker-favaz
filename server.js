const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
/**
 * Getting the Routers
 */
const authRoute = require("./Routes/AuthRouter");
const catogoryRoute = require("./Routes/CategoryRouter");
const transactionRoute = require("./Routes/TransactionRouter");
const errorHandler = require("./middleware/error");

const router = express.Router();
app.use(express.json());
// // env variables
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// using body parsher
app.use(bodyParser.json(), cors());

// mongoose connection to db

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", require("./NewRoutes/NewAuth"));
app.use("/api/", require("./NewRoutes/TrackerRoutes"));
app.use("/api/auth", authRoute);
app.use("/api/catogory", catogoryRoute);
app.use("/api/transaction", transactionRoute);

// Error Handler Middleware
app.use(errorHandler);

// port connection with URL
app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
