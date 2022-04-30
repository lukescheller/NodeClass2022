// const square = (x) => {
//   return x * x;
// };

// console.log(square(4));

const event = {
  name: "bday party",
  guestL: ["luke", "andrew", "jenn"],
  print() {
    console.log("guest list of " + this.name);
    this.guestL.forEach((g) => {
      console.log(g + "is attending my " + this.name);
    });
  },
};

event.print();
