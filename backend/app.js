const express = require('express');

const app = express();

const cors = require('cors')

const userRoutes = require('./routes/user');

const postRoutes = require('./routes/post');


app.use(cors());

app.use(express.json())



app.use('/auth', userRoutes);
app.use('/post', postRoutes);

module.exports = app;