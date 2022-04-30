// const fs = require("fs");

// const book = {
//   title: "Ego is the Enemy",
//   author: "Ryan Holiday",
// };

// const bookJSON = JSON.stringify(book);

// fs.writeFileSync("json.json", bookJSON);

// const dataBuffer = fs.readFileSync("./json.json");
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data.title);

// const dataBuffer = fs.readFileSync("./json.json");
// const JSONStr = dataBuffer.toString();
// const parse = JSON.parse(JSONStr);

//or
// parse.name = "luke-ass";
// parse.age = 66;
// const parseJSON = JSON.stringify(parse);
// fs.writeFileSync("json.json", parseJSON);

// fs.writeFileSync(
//   "json.json",
//   JSON.stringify({
//     name: "Luke",
//     planet: "EARTH",
//     age: 30,
//   }),
//   (err) => {
//     if (err) console.log(err);
//     else {
//       console.log("File written successfully\n");
//       console.log("The written has the following contents:");
//     }
//   }
// );
