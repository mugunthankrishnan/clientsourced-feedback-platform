// require keyword -  To get access to express library.
// Node.js has only compatability with common js modules.
// Common js modules - A system implemented to share code between different files.
const express = require('express');
//import express from 'express'; - Can also be used.
const app = express(); // Creating a new express app. One project can have multiple express apps.

app.get('/', (request, response) => {
    response.send({hi: 'there good morning'});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);