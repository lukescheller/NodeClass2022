// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "loading..";
  messageTwo.textContent = "";

  const url =
    "http://localhost:3000/weather?address=philly&location=" + location + "";

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.ERROR) {
        messageOne.textContent = data.ERROR;
      } else {
        console.log(data);
        messageTwo.textContent = data.location;
        messageOne.textContent = data.forcast.description;
      }
    });
  });
});
