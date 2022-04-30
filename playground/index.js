//REMEMBER: npm i chalk - won't work - use - npm i chalk@2.4.1
// const chalk = require("chalk");
// console.log(chalk.blue.inverse("ERROR"));

const notes = require("./notes.js");
const yargs = require("yargs");

debugger;

yargs.command({
  command: "read",
  describe: "find note by title",
  builder: {
    title: {
      describe: "title you're looking for",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "list all the notes by title",
  handler() {
    notes.listNotes();
  },
});

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// yargs.command({
//   command: "list",
//   describe: "List a new note!",
//   handler() {
//     console.log("Listing a note!");
//   },
// });

yargs.parse();
// console.log(yargs.argv);
