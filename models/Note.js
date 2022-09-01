const mongoose = require('mongoose')

const connectionString = process.env.CONNECTION_STRING

mongoose
    .connect(connectionString)
    .then(() => console.log('Successfully connected to DB.'))
    .catch(error => new Error(`Error in connecting to DB: ${error.message}`))

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 3
    },
    content: {
        type: String,
        minLength: 8,
        maxLength: 255
    }
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = new mongoose.model('Note', noteSchema)