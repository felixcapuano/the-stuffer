const path = require('path');

const express = require('express');
const app = express();

const port = 9000;
const dirname = __dirname + '\\front';

const { createStuffHandler } = require('./stuff-hander.js')

app.use(express.static(path.join(dirname, 'build')));

app.put('/createstuff', createStuffHandler);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})