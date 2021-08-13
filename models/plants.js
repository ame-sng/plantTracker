const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantSchema = new Schema({
  name: {type: String, required: true},
  species: {type: String},
  image_upload: [{type: String}],
  posted_by: {type: Schema.Types.ObjectId, ref: "User" },
  water_freq: {type: Number},
  fertilise_freq: {type: Number},
  progressTrack_freq: {type: Number},
  sunlight: {type: String, enum:["Full Sun", "Part Sun", "Part Shade", "Full Shade"]},
  growing_medium: {type: String},
  location: {type: String},
  pot_size: {type: Number}, //!string or number
  pot_drain: {type: Boolean},
  date_started: {type: Date}, 
  method: {type: String},
  edible: {type: String, enum: ["Edible", "Non-edible"]},
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