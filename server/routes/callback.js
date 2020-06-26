const express = require('express');
const querystring = require('querystring');
const router = express.Router();
const cors = require('cors');
const spotify = require('../spotify/creds.js');
const axios = require('axios');
const storage = require('../services/storage');
const getMe = require('../spotify/getUser');

router.get('/callback', cors(), (req, res) => {
  const code = req.query.code || null;
  // console.log('code: ', code, '\n');
  res.redirect('http://localhost:3000/');

  // query data
  const data = querystring.stringify({
    grant_type: 'authorization_code',
    code,
    redirect_uri: spotify.creds.redirectUri,
    client_id: spotify.creds.clientId,
    client_secret: spotify.creds.clientSecret,
  });

  // get token
  (async () => {
    let response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data,
    });
    if (response.status === 200) {
      let data = await response.data;
      // console.log(data.access_token);
      // console.log(data);
      for (const prop in data) {
        storage.set(prop, data[prop]);
      }
    } else {
      console.log('error ', response.status);
    }

    // let res = await getMe.getMe();
    // console.log('new' + res);
  })();
  // res.send({ redirect: 'http://localhost:3000/', user: res });
});

module.exports = router;
