require('dotenv').config()
const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Notes AntD Rest API')
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))