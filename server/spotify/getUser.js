const axios = require('axios');
const storage = require('../services/storage');

// let x = async () => {
//   let response = await axios({
//     method: 'get',
//     url: 'https://api.spotify.com/v1/me',
//     headers: {
//       Authorization: 'Bearer ' + storage.get('access_token'),
//     },
//   });
//   if (response.status === 200) {
//     let res = await response.data;
//     // console.log('final ME ' + JSON.stringify(res));
//     let data = JSON.stringify(res);
//     return data;
//   }
// };

exports.getMe = async () => {
  let response = await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/me',
    headers: {
      Authorization: 'Bearer ' + storage.get('access_token'),
    },
  });
  if (response.status === 200) {
    let res = await response.data;
    // console.log('final ME ' + JSON.stringify(res));
    let data = JSON.stringify(res);
    return data;
  }
};
