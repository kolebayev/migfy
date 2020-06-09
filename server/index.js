console.clear();

const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 5000;

const parseAppleLink = require('./routes/parseApplePlaylistLink');
const login = require('./routes/login');

app.listen(port);

console.log(`listening on ${port} \n`);

app.use('/', parseAppleLink);
app.use('/', cors(), login);
app.get('/callback', (req, res) => {
  // const url = req.body;
  console.log('CALLBACK');
});
