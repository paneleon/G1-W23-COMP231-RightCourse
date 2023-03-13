const express = require('express')
const { urlencoded, json } = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const { connectDB } = require('./config/db')
const cors = require('cors')
const app = express()

// Connect to MongoDB database
connectDB()

// Tools 
app.use(json())
app.use(cors());
app.use(urlencoded({ extended: false }))

// Routers 

app.listen(port, () => console.log(`Server running on port: ${port}`))



