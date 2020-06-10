const express = require('express');
const spotify = require('../spotify/creds.js');
const querystring = require('querystring');
const router = express.Router();
const cors = require('cors');

router.get('/login', cors(), (req, res) => {
  const scopes = 'playlist-modify-private playlist-modify-public';
  res.header('Access-Control-Allow-Origin', '*');
  res.send(
    // res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: spotify.creds.clientId,
        scopes: scopes,
        redirect_uri: spotify.creds.redirectUri,
      })
  );
});

module.exports = router;
