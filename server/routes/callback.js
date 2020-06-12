const express = require('express');
const querystring = require('querystring');
const router = express.Router();
const cors = require('cors');
const spotify = require('../spotify/creds.js');
const https = require('https');

// const axios = require('axios');

router.get('/callback', cors(), (req, res) => {
  const code = req.query.code || null;
  console.log('code: ', code, '\n');
  res.redirect('http://localhost:3000/');

  const options = {
    method: 'POST',
    hostname: 'accounts.spotify.com',
    path: '/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const request = https.request(options, (res) => {
    const chunks = [];

    res.on('data', function (chunk) {
      chunks.push(chunk);
    });

    res.on('end', function (chunk) {
      const body = Buffer.concat(chunks);
      console.log(JSON.parse(body));
      const accessToken = JSON.parse(body).access_token;
      const refreshToken = JSON.parse(body).refresh_token;
      // понавтыкать сюда ручек, которые использвуют токен ?
    });

    res.on('error', function (error) {
      console.error(error);
    });
  });

  const postData = querystring.stringify({
    grant_type: 'authorization_code',
    code,
    redirect_uri: spotify.creds.redirectUri,
    client_id: spotify.creds.clientId,
    client_secret: spotify.creds.clientSecret,
  });

  request.write(postData);

  request.end();
});

module.exports = router;
