require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT;

const buildPath = process.argv[2] ?? '../build';

app.use(express.static(path.join(__dirname, buildPath)));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`The stuffer listenning on port : ${PORT}`);
});
