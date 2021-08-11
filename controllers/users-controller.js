const express = require("express");

const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
require("dotenv").config();

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
router.get("/:id", (req, res) => {
  const id = req.params.id;
  User.findOne({ _id: id })
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
router.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10),
  );
  User.create(req.body, (err, createdUser) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    res.status(StatusCodes.OK).send(createdUser);
  });
});

//* ==========LOGIN A USER=========== *//
// localhost:4000/v1/users/login
router.post("/login", (req, res) => {
  const username = req.body.username;
  User.findOne({ username: username }, (err, foundUser) => {
    if (!foundUser) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "Email/Password incorrect" });
    } else if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    } else {
      console.log("user found!");
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        console.log("bcrypt done")
        const token = jwt.sign({userId: foundUser._id, username: foundUser.username}, process.env.TOKEN_SECRET);
        console.log({ token });
        res.status(StatusCodes.OK).json({ token });
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "Email/Password incorrect" });
      }
    }
  });
});



//* ==========UPDATES A USER=========== *//
router.put("/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(
    id,
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
      }
      res.status(StatusCodes.OK).json(updatedUser);
    },
  );
});
module.exports = router;

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

