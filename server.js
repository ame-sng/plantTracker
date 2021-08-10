// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const path = require("path");

// =======================================
//              CONFIGURATIONS
// =======================================
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

// =======================================
//         BODY PARSER/MIDDLEWARE
// =======================================
app.use(cors());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(express.json()); // parse JSON back and forth
app.use(express.static("public"));
app.use(express.static("./client/build"));

// =======================================
//             MONGOOSE CONNECTION
// =======================================
mongoose.connection.on("error", (err) => console.log(`${err.message} is Mongod not running?`));
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

// =======================================
//         CONTROLLERS/ROUTES
// =======================================
const plantsController = require("./controllers/plants-controller");

app.use("/v1/plants", plantsController);

const usersController = require("./controllers/users-controller");

app.use("/v1/users", usersController);

// =======================================
//              LISTENER
// =======================================
//* allow for pathing on deployment e.g. Heroku
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log("Listening on the port", PORT);
});
