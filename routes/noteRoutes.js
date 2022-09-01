const express = require('express')
const notesController = require('../controllers/notesController')

const router = express.Router()

router.route('/')
    .get(notesController.getAllNotes)
    .post(notesController.createNewNote)
    .put()
    .delete()

module.exports = router