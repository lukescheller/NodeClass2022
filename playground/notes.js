const fs = require("fs");
const chalk = require("chalk");

const readNote = (title) => {
  const notes = loadNotes();
  const findTitle = notes.find((t) => t.title === title);
  if (findTitle) {
    console.log(chalk.green(findTitle.title) + " " + findTitle.body);
  } else {
    console.log(chalk.red("Error: no title found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  notes.forEach((n) => console.log(chalk.green(n.title)));
};

const addNote = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

const removeNote = (title) => {
  // console.log(title);
  const notes = loadNotes();
  const titleF = notes.filter((note) => note.title !== title);

  if (notes.length > titleF.length) {
    console.log(chalk.green.inverse("Title Removed!"));
    saveNotes(titleF);
  } else {
    console.log(chalk.red.inverse("No title removed"));
  }
  console.log(titleF);
  // he did it the exact same way actually - just added an already existing function
  // console.log(titleF);
  // const dataJSON = JSON.stringify(titleF);
  // fs.writeFileSync("notes.json", dataJSON);
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
