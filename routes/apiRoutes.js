const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const noteService = require("../services/NoteService");

router.get("/notes", (req, res) => {
  noteService.getNotes().then((notes) => {
    return res.json(notes);
  });
});

router.post("/notes", function (req, res) {
  const { title, text } = req.body;
  const note = {
    id: uuidv4(),
    title,
    text,
  };
  noteService.getNotes().then((notes) => {
    notes.push(note);
    noteService.writeFile(notes);
    return res.json(note);
  });
});

router.delete("/notes/:id", function (req, res) {
  noteService.getNotes().then((notes) => {
    const filteredNotes = notes.filter((note) => note.id !== req.params.id);
    noteService.writeFile(filteredNotes);
    console.log(filteredNotes);
    return res.json(true);
  });
});

module.exports = router;
