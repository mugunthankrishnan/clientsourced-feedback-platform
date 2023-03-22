// require keyword -  To get access to express library.
// Node.js has only compatability with common js modules.
// Common js modules - A system implemented to share code between different files.
const express = require('express');
//import express from 'express'; - Can also be used.

// Import mongoose library to connect to mongodb
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express(); // Creating a new express app. One project can have multiple express apps.

// Setting cookie properties. keys indicate the cookie is unqiue.
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // set cookie expiration time to 30 days
        keys: [keys.cookieKey] // to encrypt the cookie
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);