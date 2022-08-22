require("./models/db");

const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");

const movieController = require("./controllers/movieController");

var app = express();
app.use(
  bodyparser.urlencoded({
    extended: true,
  });
);
app.use(bodyparser.json());
app.set("views", path.join(__dirname, "/views/"));
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/",
  })
);
app.set("view engine", "hbs");

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port", port));

app.use("/movie", movieController);
