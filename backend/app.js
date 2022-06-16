const express = require('express');

const path = require('path')

const app = express();

const cors = require('cors')

const userRoutes = require('./routes/user');

const postRoutes = require('./routes/post');


app.use(cors());

app.use(express.json())



app.use('/auth', userRoutes);
app.use('/post', postRoutes);

app.use('/images', express.static(path.join(__dirname, "images")))

module.exports = app;