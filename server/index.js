console.clear();

const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 5000;

const parseAppleLink = require('./routes/parseApplePlaylistLink');
const login = require('./routes/login');
const callback = require('./routes/callback');

// parse apple playlist w/ JSDOM
app.use('/', parseAppleLink);

// login 2 spotify
app.use('/', cors(), login);

// callback
app.use('/', cors(), callback);

app.listen(port);
console.log(`listening on ${port} \n`);