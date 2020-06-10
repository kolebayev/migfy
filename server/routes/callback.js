const express = require('express');
const querystring = require('querystring');
const router = express.Router();
const cors = require('cors');
const spotify = require('../spotify/creds.js');

console.log('callback route works')

router.get('/callback', cors(), (req, res) => {
    // этот консоль лог нихуя не работает
    console.log('callback route works')
});

module.exports = router;
