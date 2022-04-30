const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../src/templates/views");
const partialsPath = path.join(__dirname, "../src/templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

//paths
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Luke Scheller",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Luke Scheller",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    msg: "help is on the way!",
    title: "Help",
    name: "Luke Scheller",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address",
    });
  }

  if (!req.query.location) {
    return res.send({
      error: "you must provide a location",
    });
  }

  //{res.longitude, res.latitude, res.place} - you can't write that as the parameter
  geocode(req.query.location, (error, { longitude, latitude, place } = {}) => {
    if (error) {
      //error: error
      return res.send({ ERROR: error });
    }
    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forcast: forecastData,
        location: place,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }

  // console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "help 404",
    msg: "404 - help article not found",
    name: "Luke Scheller",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    msg: "404 - page not found",
    name: "Luke Scheller",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
