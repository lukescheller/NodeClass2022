// // the callback can have any amount of parameters - it doesn't have to be declared here
// const pizza = (pizza, callback) => {
//   console.log(pizza);
//   // the callback is given something when it is created - it can be a defined variable or a string that's passed directly as a parameter
//   // const error = "hello";
//   callback("works", "second parameter");
// };

// // this shit is so weird - it just needs a parameter....
// pizza("pizza", (r, m) => {
//   // r is not defined within the pizza() call.... however it still recognizes the string that was passed from above
//   console.log(m);
// });

// const request = require("request");

// const apiCaller = (location, callback) => {
//   const url =
//     "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
//     encodeURIComponent(location) +
//     ".json?access_token=pk.eyJ1IjoibHVrZXNjaGVsbGVyIiwiYSI6ImNsMXA5dXlzaDA4YjUzZG9kcTF6ODJ4MnYifQ.p_cyL9s5XLalTQaBNghf-A&limit=1";

//   request({ url, json: true }, (error, response) => {
//     if (error) {
//       callback("an error has occured", undefined);
//     } else {
//       callback(undefined, response.body);
//     }
//   });
// };

// const cF = (longitude, latitude, callback) => {
//   const url =
//     "http://api.weatherstack.com/current?access_key=245698e04d920b13d21a788a325148cc&query=" +
//     +latitude +
//     +"," +
//     +longitude +
//     +"&units=f";

//   request({ url, json: true }, (error, response) => {
//     if (error) {
//       callback("an error has occured", undefined);
//     } else {
//       callback(undefined, response);
//     }
//   });
// };

// // errorMessage and apiData look as if they're undefined but they're just placeholders - it's how you get access to the results
// apiCaller("croatia", (errorMessage, apiData) => {
//   if (errorMessage) {
//     return console.log(errorMessage);
//   }
//   const long = apiData.features[0].center[0];
//   const lat = apiData.features[0].center[1];
//   // when you call the function later - error looks like a variable that's undefined but it's not - it's simply a placeholder - the function requires 2 parameters
//   // the parameters don't even have to be named the same as when it was originally created
//   cF(long, lat, (e, r) => {
//     if (e) {
//       console.log(e);
//     } else {
//       console.log(r.body);
//     }
//   });
// });

// const map = (array, callback) => {
//   const mappedArray = [];
//   for (const item of array) {
//     mappedArray.push(callback(item));
//   }
//   return mappedArray;
// };

// const greet = (name) => {
//   return `Hello, ${name}!`;
// };

// const persons = ["Cristina", "Ana", "LUKAS"];
// const messages = map(persons, greet);
// console.log(messages);

// const promiseCaller = (bool) => {
//   return new Promise((resolve, reject) => {
//     return bool ? resolve("True was entered") : reject("False was entered");
//   })
//     .then((val) => {
//       console.log(val);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// const secondPromiseCaller = (time) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(time / 1000 + " seconds have passed.");
//     }, time);
//   }).then((res) => {
//     console.log(res);
//   });
// };

// const exampleFunction = (msg, x, y, callback) => {
//   callback(msg, x, y);
// };

// //This shit is so weird BUT... it's making sense now.
// //
// const add = (msg, x, y) => {
//   console.log(msg, x * y);
// };

// exampleFunction("MATH:", 24, 20275, add);

// const anotherCB = (x, y, callback) => {
//   //call back variables already set
//   callback("error", "data", {
//     name: "me",
//   });
// };

// const p = 3;
// const d = 9;
// //this is how you access the preset callback variables
// //they can be named whatever you want them to be named - whatever makes sense
// anotherCB(p, d, (a, b, c) => {
//   console.log(a, b, c.name);
//   console.log(p / d);
// });
