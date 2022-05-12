const express = require('express');

const app = express();

const userRoutes = require('./routes/user');

app.use(express.json())



app.use('/auth', userRoutes);

module.exports = app;