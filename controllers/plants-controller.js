const express = require("express");

const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../utils/cloudinary");
const Plant = require("../models/plants");
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
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Unauthorised Access" });
    }
    req.user = user;
    next();
  });
};

//* ==========GETS ALL PLANTS=========== *//
// localhost:4000/v1/plants/
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
  Plant.findOne({ name: name }, (err, foundOne) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    res.status(StatusCodes.OK).json(foundOne);
  });
});



//* ==========CREATE A PLANT=========== *//
router.post("/upload", authenticateToken, async (req, res) => {
  try {
    const fileString = req.body.data;
    console.log("fileString: ", fileString);
    const uploadResponse = await cloudinary.uploader.upload(fileString, {
      upload_preset: "plantTracker",
    });
    console.log("uploadResponse: ", uploadResponse);
    res.json({ msg: "yay uploaded to cloudinary!" });
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
      posted_by: req.body.posted_by,
    });
    await plant.save();
    User.findByIdAndUpdate(
      req.body.posted_by,
      { $push: { plants: plant._id } },
      { new: true },
      (err, foundUser) => {
        if (err) {
          res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
        }
        res.status(StatusCodes.OK)
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Uh oh. Something went wrong" });
  }
});

//CREATES A LOG
router.put("/log/:id", authenticateToken, async (req,res)=> {
  const id = req.params.id;
  const log_entry = {
    pub_date: req.body.pub_date,
    headline: req.body.headline,
    body_text: req.body.body_text,
    }
    try {
    const plant = await Plant.findById(id)
    console.log(plant)
    console.log("log: ", log_entry)
    plant.log_entries.push(log_entry)
    const updated = await plant.save()
    console.log(updated)
    res.status(StatusCodes.OK).json(updated)
      return
  }
    catch (err) {
      console.log(err)
      res.status(500).json({ err: "Uh oh. Something went wrong" });
      return
    }
})


//* ==========UPDATE A PLANT=========== *//
//UPDATES IMAGE
router.put("/:id/image", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id
    const fileString = req.body.data;
    console.log("fileString: ", fileString);
    const uploadResponse = await cloudinary.uploader.upload(fileString, {
      upload_preset: "plantTracker",
    });
    console.log("uploadResponse: ", uploadResponse);
    // res.json({ msg: "yay uploaded to cloudinary!" });
    Plant.findByIdAndUpdate(id, 
      {$push: {"image_upload": uploadResponse.secure_url }},
      {new: true},
      (err, plantImage) => {
        if (err) {
          res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
          return
        }
        res.status(StatusCodes.OK).json(plantImage)
        return
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Uh oh. Something went wrong" });
    return
  }
});


//UPDATES A POST
router.put("/log/update/:logId", authenticateToken, async (req,res)=> {
  const id = req.body._id;
  const logId = {_id: req.params.logId}
    try {
    const plant = await Plant.findById(id)
    console.log(plant)
    console.log("log Id is: ", logId)
    console.log("right headline: ",plant.log_entries.id(logId).headline)
    plant.log_entries.id(logId).headline = req.body.headline
    plant.log_entries.id(logId).pub_date = req.body.newDate
    plant.log_entries.id(logId).body_text = req.body.body_text
    const updated = await plant.save()
    console.log(updated)
    res.status(StatusCodes.OK).json(updated)
      return
  }
    catch (err) {
      console.log(err)
      res.status(500).json({ err: "Uh oh. Something went wrong" });
      return
    }
})

//UPDATES ALL
router.put("/:id", authenticateToken, (req, res) => {
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
  });
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

//* ==========DELETE AN IMAGE=========== *//
router.put("/:id", authenticateToken, (req, res) => {
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
  });
});

//* ==========DELETE A POST=========== *//
router.put("/log/delete/:logId", authenticateToken, async (req,res)=> {
  const id = req.body._id;
  const logId = {_id: req.params.logId}
    try {
    const plant = await Plant.findById(id)
    console.log(plant)
    console.log("log Id is: ", logId)
    plant.log_entries.pull(logId)
    const updated = await plant.save()
    console.log(updated)
    res.status(StatusCodes.OK).json(updated)
      return
  }
    catch (err) {
      console.log(err)
      res.status(500).json({ err: "Uh oh. Something went wrong" });
      return
    }
})

module.exports = router;
