const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const ApiRoutes = require('./src/routes/data.route');


(async () => {
  try {

    const connectmDB = await mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    if (connectmDB) {
      console.log(`Connected to DB`);
    }

  } catch (err) {
    console.log(`Failed to connect to DB ${err}`);
  }
})();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Log request data
app.use(morgan('dev'));


// Routes which should handle requests
app.use('/api', ApiRoutes);

// App Health Check
app.get('/', (req, res)=> res.sendStatus(200));


// Handle Error Requests
app.use((req, res, next) => {
  const error = new Error();
  error.message = 'Not Found';
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json({ error: error.message });
});

module.exports = app;
