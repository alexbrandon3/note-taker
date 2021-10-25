const path = require("path");
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class NoteService {
  getNotes() {
    return this.readFile().then((data) => {
      return JSON.parse(data);
    });
  }
  // helper functions
  readFile() {
    return readFileAsync(path.join(__dirname, "../db/db.json"), "utf8");
  }
  writeFile(notes) {
    return writeFileAsync(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(notes)
    );
  }
}

module.exports = new NoteService();
