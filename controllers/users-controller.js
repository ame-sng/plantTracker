const express = require("express");
const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const User = require("../models/users");

//* ==========GETS ALL USERS=========== *//
//localhost:4000/v1/users/
router.get("/", (req, res)=>{
  User.find({}, (err, foundUsers)=>{
    if(err){
      res.status(StatusCodes.BAD_REQUEST).json({error: err.message});
    };
    res.status(StatusCodes.OK).json(foundUsers);
  })
})

//* ==========GETS USER BY ID=========== *//
//localhost:4000/v1/users/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  User.findOne({ _id: id })
    .populate("plants")
    .exec(function (err, Users) {
      console.log("users: ", Users);
      if (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
      }
      res.status(StatusCodes.OK).json(Users);
    });
});

//* ==========CREATES A USER=========== *//
router.post("/", (req, res)=>{
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(20)
  );
  User.create(req.body, (err, createdUser)=>{
    if(err){
      res.status(StatusCodes.BAD_REQUEST).json({error: err.message})
    };
    res.status(StatusCodes.OK).send(createdUser);
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
    }
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

