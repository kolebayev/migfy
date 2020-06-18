const express = require('express');
const querystring = require('querystring');
const router = express.Router();
const cors = require('cors');
const spotify = require('../spotify/creds.js');
const axios = require('axios');
const storage = require('../services/storage');

router.get('/callback', cors(), (req, res) => {
  const code = req.query.code || null;
  console.log('code: ', code, '\n');
  res.redirect('http://localhost:3000/');

  // ручка апи спотифая
  // const getAccountData = async (token) => {
  //   let response = await axios({
  //     method: 'get',
  //     url: 'https://api.spotify.com/v1/me',
  //     headers: {
  //       Authorization: 'Bearer ' + token,
  //     },
  //   });
  //   if (response.status === 200) {
  //     let res = await response.data;
  //     console.log('final ' + JSON.stringify(res));
  //   }
  // };

  // данные запроса
  const data = querystring.stringify({
    grant_type: 'authorization_code',
    code,
    redirect_uri: spotify.creds.redirectUri,
    client_id: spotify.creds.clientId,
    client_secret: spotify.creds.clientSecret,
  });

  // получение токена
  (async () => {
    let response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data,
    });
    if (response.status === 200) {
      let data = await response.data;
      console.log(data.access_token);
      console.log(data);
      for (const prop in data) {
        // console.log(`${property}: ${object[property]}`);
        storage.set(prop, data[prop]);
      }
      // storage.set(...data);
      // callback(data.access_token);
    } else {
      console.log('error ', response.status);
    }
  })();

  // getToken(getAccountData);
});

module.exports = router;
