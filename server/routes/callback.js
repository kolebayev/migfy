const express = require('express');
const querystring = require('querystring');
const router = express.Router();
const cors = require('cors');
const spotify = require('../spotify/creds.js');

console.log('callback route works');

router.get('/callback', cors(), (req, res) => {
  const code = req.query.code || null;
  console.log('code: ', code);
  //   console.log(req.query.state);
  res.redirect('http://localhost:3000');

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: spotify.creds.redirectUri,
      grant_type: 'authorization_code',
    },
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(spotify.creds.clientId + ':' + spotify.creds.clientSecret).toString('base64'),
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token,
        refresh_token = body.refresh_token;

      var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { Authorization: 'Bearer ' + access_token },
        json: true,
      };

      // use the access token to access the Spotify Web API
      request.get(options, function (error, response, body) {
        console.log(body);
      });

      // we can also pass the token to the browser to make requests from there
      //   res.redirect(
      //     '/#' +
      //       querystring.stringify({
      //         access_token: access_token,
      //         refresh_token: refresh_token,
      //       })
      //   );
    } else {
      res.redirect(
        '/#' +
          querystring.stringify({
            error: 'invalid_token',
          })
      );
    }
  });
});

module.exports = router;
