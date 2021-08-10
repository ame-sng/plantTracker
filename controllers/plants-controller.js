const express = require("express");

const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const Plant = require("../models/plants");
require("dotenv").config();


//* ==========AUTHENTICATION=========== *//
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
//* ==========GETS ALL PLANTS=========== *//
// localhost:4000/v1/plants/
router.get("/", authenticateToken, (req, res) => {
  Plant.find({}, (err, foundPlants) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    res.status(StatusCodes.OK).json(foundPlants);
  });
});

//* ==========GETS PLANT BY ID=========== *//
// localhost:4000/v1/plants/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Plant.findById(id, (err, foundOne) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    res.status(StatusCodes.OK).json(foundOne);
  });
});

//* ==========CREATE A PLANT=========== *//

router.post("/", authenticateToken, (req, res) => {
  Plant.create(req.body, (err, createdPlant) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    res.status(StatusCodes.OK).send(createdPlant);
  });
});

//* ==========UPDATE A PLANT=========== *//
router.put("/:id", (req, res) => {
  const id = req.params.id;
  Plant.findByIdAndUpdate(
    id,
    req.body,
    { new: true },
    (err, updatedPlant) => {
      if (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
      }
      res.status(StatusCodes.OK).send(updatedPlant);
    },
  );
});

//* ==========DELETE A PLANT=========== *//
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Plant.findByIdAndRemove(id, (err, deletedPlant) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    res.status(StatusCodes.OK).json(deletedPlant);
  });
});

module.exports = router;
