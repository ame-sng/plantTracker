const express = require("express");

const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../utils/cloudinary");
const Plant = require("../models/plants");

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

//* ==========GETS ALL PLANTS=========== *//
// localhost:4000/v1/plants/
//! ADD AUTHENTICATION?
router.get("/", (req, res) => {
  Plant.find({}, (err, foundPlants) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    res.status(StatusCodes.OK).json(foundPlants);
  });
});

//* ==========GETS PLANT BY NAME=========== *//
// localhost:4000/v1/plants/:name
router.get("/:name", (req, res) => {
  const name = req.params.name;
  Plant.findOne({name: name}, (err, foundOne) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    res.status(StatusCodes.OK).json(foundOne);
  });
});

//* ==========CREATE A PLANT=========== *//
//! ADD AUTHENTICATION

router.post("/upload", authenticateToken, async (req, res)=> {
  try{
    const fileString = req.body.data;
    console.log("fileString: ", fileString)
    const uploadResponse = await cloudinary.uploader.upload(fileString, {
      upload_preset: 'plantTracker',
  }); 
    console.log("uploadResponse: ", uploadResponse)
    res.json({msg: "yay uploaded to cloudinary!"})
    let plant = new Plant({
      image_upload: uploadResponse.secure_url,
      name: req.body.name,
      species: req.body.species,
      posted_by: req.body.user_id,
      date_started: req.body.date_started,
      water_freq: req.body.water_freq,
      fertilise_freq: req.body.fertilise_freq,
      progressTrack_freq: req.body.progressTrack_freq,
      sunlight: req.body.sunlight,
      growing_medium: req.body.growing_medium,
      location: req.body.location,
      pot_size: req.body.pot_size,
      pot_drain: req.body.pot_drain,
      method: req.body.method,
      edible: req.body.edible,
    })
    await plant.save();
    User.findByIdAndUpdate(
      req.body.user_id,
      { $push: { plants: plant._id } },
      { new: true },
      (err, foundUser) => res.json(post)
    );
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: "Uh oh. Something went wrong" })
  }
})


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
