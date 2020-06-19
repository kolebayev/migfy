const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
// const FastAverageColor = require('fast-average-color');

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

  // check page markup
  let checkingClass = dom.window.document.querySelectorAll('.product-info');
  checkingClass.length === 0 && res.status(500).end();

  // get track names
  let trackNodes = dom.window.document.querySelectorAll('.song-name');

  // get artist names
  let artistNodes = dom.window.document.querySelectorAll('div.typography-caption > a.dt-link-to');

  // get album cover images
  let artworkNodes = dom.window.document.querySelectorAll(
    'div.song-index > .media-artwork-v2 > img.media-artwork-v2__image'
  );

  // get playlist cover image
  let plCoverURLNode = dom.window.document.querySelector(
    '.product-lockup__artwork-for-product > img.media-artwork-v2__image'
  );
  let plCoverURL = null;
  let plCoverAverageColor = 'rgba(0,0,0,.1)';
  // if playlist has cover
  if (plCoverURLNode != null) {
    //set playlist cover image URL
    let urlList = plCoverURLNode.srcset;
    let urlArray = urlList.split(',');
    plCoverURL = urlArray[urlArray.length - 1].substring(
      0,
      urlArray[urlArray.length - 1].length - 5
    );
    // TODO
    // set playlist cover image average color for shadow
    // const fac = new FastAverageColor();
    // (async () => {
    //   const color = await fac.getColor(plCoverURLNode);
    //   plCoverAverageColor = color.hex;
    // })();
    // console.log(plCoverAverageColor);
  }

  // get playlist name
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
    // plCoverAverageColor,
    url,
    tracklist,
  });
});

module.exports = router;
