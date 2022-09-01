require('dotenv').config()
const express = require('express')
const noteRoutes = require('./routes/noteRoutes')

const app = express()

app.use(express.json())
app.use('/api/notes', noteRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))