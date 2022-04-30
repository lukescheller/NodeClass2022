const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=245698e04d920b13d21a788a325148cc&query=" +
    +latitude +
    +"," +
    +longitude +
    +"&units=f";
  //res.body
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        feels_like: body.current.feelslike,
        description: body.current.weather_descriptions[0],
      });
    }
  });
};

module.exports = forecast;
