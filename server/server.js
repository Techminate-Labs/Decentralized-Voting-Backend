const express = require('express');
const colors = require('colors');
const cors = require("cors");
const dotenv = require('dotenv').config();
const { errorHandler } = require('./app/Middleware/ErrorMiddleware');
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Whitelist your url for cors (This is a sample url only you can add your own url.)
const whitelist = ["http://localhost:3000", "http://localhost:5000"];

// Check if the origin is trying to access our api.
// Check if it's one of the whitelist website.
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// use cors and add options
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/api', require('./routes/api'))

app.use(errorHandler)

app.listen(port, ()=> console.log(`Runing on port ${port}`))