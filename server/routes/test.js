const https = require('https');

const data = JSON.stringify({
  name: 'John Doe',
  job: 'DevOps Specialist',
});

const options = {
  hostname: 'reqres.in',
  path: '/api/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

const req = https
  .request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(JSON.parse(data));
    });
  })
  .on('error', (err) => {
    console.log('Error: ', err.message);
  });

req.write(data);
req.end();
