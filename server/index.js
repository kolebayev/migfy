console.clear()

const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

const parseAppleLink = require("./routes/parseApplePlaylistLink");

app.listen(port);
console.log(`listening on ${port} \n`);

app.use("/", parseAppleLink);