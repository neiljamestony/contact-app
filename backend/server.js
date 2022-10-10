const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000
const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorMiddleware')
const cors = require('cors')

connectDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/contact', errorHandler, require('./routes/contactRoutes'))

app.listen(port, () => console.log(`Server is running on ${port}`))

