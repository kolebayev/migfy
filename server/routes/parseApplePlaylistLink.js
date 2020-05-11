const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

router.use(bodyParser.text({ type: 'text/plain' }));

router.post('/parseApplePlaylistLink', async (req, res) => {
  const url = req.body;
  let dom = await JSDOM.fromURL(url, {
    storageQuota: 100000000,
    referrer: url,
    runScripts: 'dangerously',
  }).catch((e) => {
    res.status(e.statusCode).end();
  });

  let checkingClass = dom.window.document.querySelectorAll('.product-info');
  checkingClass.length === 0 && res.status(500).end();

  let trackNodes = dom.window.document.querySelectorAll('.song-name');

  let artistNodes = dom.window.document.querySelectorAll('div.typography-caption > a.dt-link-to');

  let artworkNodes = dom.window.document.querySelectorAll(
    'div.song-index > .media-artwork-v2 > img.media-artwork-v2__image'
  );

  let plCoverURLNode = dom.window.document.querySelector(
    '.product-lockup__artwork-for-product > img.media-artwork-v2__image'
  );
  let urlList = plCoverURLNode.srcset;
  let urlArray = urlList.split(',');
  let plCoverURL = urlArray[urlArray.length - 1].substring(
    0,
    urlArray[urlArray.length - 1].length - 5
  );

  let plName = dom.window.document.querySelector('h1.product-name').textContent.replace(/\n/g, '');

  let tracklist = [];

  for (let i = 0; i < trackNodes.length; i++) {
    let url = artworkNodes[i].srcset;
    url.length > 1 ? (url = url.split(',')[1].slice(0, -4).replace(/\n/g, '')) : (url = '');

    tracklist.push({
      name: trackNodes[i].textContent.replace(/\s{2}/g, '').replace(/\n/g, ''),
      artist: artistNodes[i].textContent,
      artworkLink: url,
      id: i,
      willProcessed: true,
      wasFound: false,
    });
  }

  res.send({
    name: plName,
    cover: plCoverURL,
    url,
    tracklist,
  });
});

module.exports = router;
