const express = require('express');
const spotify = require('../spotify/creds.js');
const querystring = require('querystring');
const router = express.Router();
const cors = require('cors');
// const corsOptions = {
//   origin: 'http://localhost:3000/',
// };

router.get('/login', cors(), (req, res) => {
  const scopes = 'playlist-modify-private  ';
  res.header('Access-Control-Allow-Origin', '*');
  res.set('content-type', 'text/plain');
  res.send(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: spotify.creds.clientId,
        scopes: scopes,
        // redirect_uri: encodeURIComponent(spotify.creds.redirectUri),
        redirect_uri: spotify.creds.redirectUri,
      })
  );
});

module.exports = router;
