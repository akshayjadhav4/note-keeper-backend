const express = require("express");
const router = express.Router();
const { getUserById } = require("../controllers/user");
const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/authentication");
const {
  createNote,
  getNoteById,
  getNote,
  userNotes,
  updateNote,
  deleteNote,
} = require("../controllers/note");

//router param
router.param("userId", getUserById);
router.param("noteId", getNoteById);

router.post("/note/create/:userId", isSignedIn, createNote);

router.get("/note/:userId/:noteId", isSignedIn, isAuthenticated, getNote);
router.get("/notes/:userId", isSignedIn, isAuthenticated, userNotes);

router.put(
  "/note/update/:userId/:noteId",
  isSignedIn,
  isAuthenticated,
  updateNote
);

router.get(
  "/note/delete/:userId/:noteId",
  isSignedIn,
  isAuthenticated,
  deleteNote
);

module.exports = router;
