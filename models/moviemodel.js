const mongoose = require("mongoose");

var movieSchema = new mongoose.Schema({
  moviename: {
    type: String,
  },
  rating: {
    type: Number,
  },
  cast: {
    type: Array,
  },

  genre: {
    type: String,
  },
  releasedate: {
    type: Date,
  },
});

mongoose.model("movie", movieSchema);
