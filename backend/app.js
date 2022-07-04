const express = require('express');

const path = require('path')

const app = express();

const cors = require('cors')

const helmet = require("helmet");

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter);

const userRoutes = require('./routes/user');

const postRoutes = require('./routes/post');

app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(cors());

app.use(express.json())



app.use('/auth', userRoutes);
app.use('/post', postRoutes);

app.use('/images', express.static(path.join(__dirname, "images")))

module.exports = app;