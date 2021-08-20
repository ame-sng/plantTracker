const express = require("express");

const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const User = require("../models/users");
require("dotenv").config();


//* ==========AUTHENTICATION MIDDLEWARE=========== *//
const authenticateToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  const token = bearerHeader && bearerHeader.split(" ")[1];
  if (token == null) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "No Token" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: "Unauthorised Access" });
    }
    req.user = user;
    next();
  });
};


//* ==========GETS ALL USERS=========== *//
// localhost:4000/v1/users/
router.get("/", (req, res) => {
  User.find({}, (err, foundUsers) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    res.status(StatusCodes.OK).json(foundUsers);
  });
});

//* ==========GETS USER BY ID=========== *//
// localhost:4000/v1/users/:id

router.get("/:username", (req, res) => {
  const username = req.params.username;
  User.findOne({ username: username })
    .populate("plants")
    .exec((err, Users) => {
      console.log("users: ", Users);
      if (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
      }
      res.status(StatusCodes.OK).json(Users);
    });
});

//* ==========CREATES A USER=========== *//
router.post("/", async (req, res) => {
  const { username } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "User already exists" });
  }
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, createdUser) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    res.status(StatusCodes.OK).json({
      _id: createdUser._id,
      username: createdUser.username,
      email: createdUser.email,
      token: generateToken(createdUser._id),
    });
  });
});

//* ==========LOGIN A USER=========== *//
// localhost:4000/v1/users/login
router.post("/login", (req, res) => {
  const username = req.body.username;
  User.findOne({ username: username }, (err, foundUser) => {
    if (!foundUser) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Email/Password incorrect" });
    } else if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    } else {
      console.log("user found!");
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        console.log("bcrypt done");
        res.status(StatusCodes.OK).json({
          _id: foundUser._id,
          username: foundUser.username,
          email: foundUser.email,
          plants: foundUser.plants,
          token: generateToken(foundUser._id),
        });
      } else {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Email/Password incorrect" });
      }
    }
  });
});

// //* ==========UPDATES A USER=========== *//
router.put("/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { new: true }, (err, updatedUser) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    res.status(StatusCodes.OK).json(updatedUser);
  });
});

//* ==========DELETES A USER=========== *//
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id, (err, deletedUser) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    res.status(StatusCodes.OK).json(deletedUser);
  });
});

module.exports = router;