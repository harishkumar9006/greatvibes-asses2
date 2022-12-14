const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Movie = mongoose.model("movie");

router.get("/", (req, res) => {
  res.render("movie/addOrEdit", {
    viewTitle: "Insert Movie ",
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

function insertRecord(req, res) {
  var movie = new Movie();
  movie.moviename = req.body.moviename;
  movie.rating = req.body.rating;
  movie.cast = req.body.cast;
  movie.genre = req.body.genre;
  movie.releasedate = req.body.releasedate;
  movie.save((err, doc) => {
    if (!err) res.redirect("movie/list");
    else {
      if (err.name == "ValidationError") {
        -handleValidationError(err, req.body);
        res.render("movie/addOrEdit", {
          viewTitle: "Insert Movie",
          movie: req.body,
        });
      } else console.log("Error during record insertion : " + err);
    }
  });
}

function updateRecord(req, res) {
  Movie.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("movie/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("movie/addOrEdit", {
            viewTitle: "Update movie",
            movie: req.body,
          });
        } else console.log("Error during record update : " + err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  Movie.find((err, docs) => {
    if (!err) {
      res.render("movie/list", {
        list: docs,
      });
    } else {
      console.log("Error in retrieving movie  list :" + err);
    }
  });
});

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "fullName":
        body["fullNameError"] = err.errors[field].message;
        break;
      case "email":
        body["emailError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

router.get("/:id", (req, res) => {
  Movie.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("movie/addOrEdit", {
        viewTitle: "UpdateMovie",
        movie: doc,
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  Movie.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/movie/list");
    } else {
      console.log("Error in movie delete :" + err);
    }
  });
});

module.exports = router;
