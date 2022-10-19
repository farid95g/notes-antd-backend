const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')


/**
 * @desc Get all notes
 * @route GET /api/notes
 * @access Public
 */
const getAllNotes = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query

    const [{ notes, total: [{ total }] }] = await Note.aggregate([{
        $facet: {
            notes: [
                { $match: {} },
                { $skip: (parseInt(page) - 1) * parseInt(limit) },
                { $limit: parseInt(limit) }
            ],
            total: [
                { $match: {} },
                { $count: 'total' }
            ]
        }
    }])

    return res.json({
        data: notes,
        total,
        currentPage: parseInt(page)
    })
})


/**
 * @desc Create new note
 * @route POST /api/notes
 * @access Public
 */
const createNewNote = asyncHandler(async (req, res) => {
    const { title, content } = req.body

    if (!title || !content) {
        return res.status(400).json({ message: 'All fields are required!' })
    }

    const newNote = await Note.create({ title, content })

    if (!newNote) {
        return res.status(422).json({ message: 'Invalid note data received!' })
    }

    res.status(201).json(newNote)
})


/**
 * @desc Get single note
 * @route GET /api/notes/:id
 * @access Public
 */
const getNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id).lean().exec()

    if (!note) {
        return res.status(404).json({ message: `Note with id ${req.params.id} does not exist!` })
    }

    res.json(note)
})


/**
 * @desc Update existing note
 * @route PUT /api/notes/:id
 * @access Public
 */
const updateNote = asyncHandler(async (req, res) => {
    const { title, content } = req.body

    if (!title || !content) {
        return res.status(400).json({ message: 'All fields are required to update!' })
    }

    const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        { title, content },
        { new: true, runValidators: true, context: 'query' }
    )

    if (!updatedNote) {
        return res.status(422).json({ message: 'Invalid note data received!' })
    }

    res.json(updatedNote)
})


/**
 * @desc Delete note
 * @route /api/notes/:id
 * @access Public
 */
const deleteNote = asyncHandler(async (req, res) => {
    const isDeleted = await Note.findByIdAndDelete(req.params.id)

    if (!isDeleted) {
        return res.status(400).json({ message: `Note with id ${req.params.id} does not exist!` })
    }

    res.status(204).json({ message: 'Note has been deleted successfully!' })
})


module.exports = {
    getAllNotes,
    createNewNote,

    getNote,
    updateNote,
    deleteNote
}