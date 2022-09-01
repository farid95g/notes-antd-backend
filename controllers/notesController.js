const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')


/**
 * @desc Get all notes
 * @route GET /api/notes
 * @access Public
 */
const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find().lean()

    if (!notes.length) {
        return res.status(404).json({ message: 'No notes found' })
    }

    res.json(notes)
})


/**
 * @desc Create new note
 * @route POST /api/notes
 * @access Public
 */
const createNewNote = asyncHandler(async (req, res) => {
    const { title, content } = req.body

    if (!title || !content) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const newNote = await Note.create({ title, content })

    if (!newNote) {
        return res.status(422).json({ message: 'Invalid note data received' })
    }

    res.status(201).json(newNote)
})


module.exports = {
    getAllNotes,
    createNewNote
}