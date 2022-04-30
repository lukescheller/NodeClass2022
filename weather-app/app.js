const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const process = require("process");

//process.argv is an array
if (process.argv.length === 2) {
  console.log("Please provide a location!");
} else if (process.argv.length >= 4) {
  console.log(
    'Locations with 2 words must be inside quotation marks - example: "new york"'
  );
} else {
  // res.longitude
  geocode(process.argv[2], (error, { longitude, latitude, place }) => {
    if (error) {
      return console.log(error);
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }
      console.log(place);
      console.log(forecastData);
    });
  });
}
