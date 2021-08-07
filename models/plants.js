const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantSchema = new Schema({
  name: {type: String, required: true},
  species: {type: String},
  water_freq: {type: Number},
  fertilise_freq: {type: Number},
  progressTrack_freq: {type: Number},
  sunlight: {type: String},
  growing_medium: {type: String},
  indoors: {type: String, enum: ["indoor", "outdoor"]},
  pot_size: {type: Number},
  pot_drain: {type: Boolean},
  edible: {type: String, enum: ["edible", "non-edible"]},
  date_started: {type: Date}, 
  method: {type: String},
  first_sprout: {type: Date}, 
  date_transplanted: {type: Date}, 
  first_flower: {type: Date},
  first_fruit: {type: Date},
  first_harvest: {type: Date},
  last_harvest: {type: Date},
  log_entries:[
    {
    pub_date: {type: Date, default: Date.now},
    body_text:{type: String}
  }
]
})

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;