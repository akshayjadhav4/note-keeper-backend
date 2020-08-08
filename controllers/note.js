const Note = require("../models/note");

exports.getNoteById = (req, res, next, id) => {
  Note.findById(id)
    .populate("author", " _id firstName  lastName")
    .exec((error, note) => {
      if (error) {
        return res.status(400).json({
          error: "Note not found",
        });
      }
      req.note = note;
      next();
    });
};

exports.createNote = (req, res) => {
  const note = new Note(req.body);
  note.save((error, note) => {
    if (error) {
      return res.status(400).json({
        message: "Note not saved",
        error: error,
      });
    }

    return res.json(note);
  });
};

exports.getNote = (req, res) => {
  return res.json(req.note);
};

exports.userNotes = (req, res) => {
  Note.find({ author: req.profile._id })
    .sort({ createdAt: -1 })
    .populate("author", " _id firstName  lastName")
    .exec((error, notes) => {
      if (error) {
        return res.status(400).json({
          error: "Notes not found",
        });
      }

      return res.json(notes);
    });
};

exports.updateNote = (req, res) => {
  const note = req.note;
  note.title = req.body.title;
  note.description = req.body.description;

  note.save((error, note) => {
    if (error) {
      return res.status(400).json({
        error: "Edit operation failed",
      });
    }
    return res.json(note);
  });
};

exports.deleteNote = (req, res) => {
  const note = req.note;
  note.remove((error, deletedNote) => {
    if (error) {
      return res.status(400).json({
        error: "delete operation failed",
      });
    }
    return res.json({
      message: `${deletedNote.title} deleted`,
    });
  });
};
