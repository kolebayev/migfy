console.clear();

const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 5000;

const parseAppleLink = require('./routes/parseApplePlaylistLink');
const login = require('./routes/login');
const callback = require('./routes/callback');
const storage = require('./services/storage');
const axios = require('axios');

// parse apple playlist w/ JSDOM
app.use('/', parseAppleLink);

// login 2 spotify
app.use('/', cors(), login);

// callback
app.use('/', cors(), callback);

// app.use('/getMe', cors(), async () => {
//   let response = await axios({
//     method: 'get',
//     url: 'https://api.spotify.com/v1/me',
//     headers: {
//       Authorization: 'Bearer ' + storage.get('access_token'),
//     },
//   });
//   if (response.status === 200) {
//     let res = await response.data;
//     console.log('final ME ' + JSON.stringify(res));
//   }
// });

// app.use('/getPl', cors(), async () => {
//   let response = await axios({
//     method: 'get',
//     url: 'https://api.spotify.com/v1/me/playlists',
//     headers: {
//       Authorization: 'Bearer ' + storage.get('access_token'),
//       'Content-Type': 'application/json',
//     },
//   });
//   if (response.status === 200) {
//     let res = await response.data;
//     console.log('final PL ' + JSON.stringify(res));
//   }
// });

app.listen(port);
console.log(`listening on ${port} \n`);
