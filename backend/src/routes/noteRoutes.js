const express = require('express');
const { getAllNotes, postAllNotes, updateNotes, deleteNotes, getAllNotesById } = require('../controllers/notesController.js');

const router = express.Router();

router.get("/", getAllNotes)
router.get("/:id", getAllNotesById)

router.post("/", postAllNotes)


router.put("/:id", updateNotes)

router.delete("/:id", deleteNotes)
module.exports = router;