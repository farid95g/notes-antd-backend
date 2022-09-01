require('dotenv').config()
const express = require('express')

const app = express()

app.use(express.json())
app.use('/api/notes', require('./routes/noteRoutes'))

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))