const dotenv = require('dotenv').config({ path: '../../.env'});
if (dotenv.error) throw dotenv.error
const HOST = process.env.STUFF_HOST;
const PORT = process.env.STUFF_PORT;

const cors = require('cors');
const express = require('express');
const app = express();

require('./mongo/core').connect();

app.use(express.json());
app.use(cors());

const stuffRouter = require('./routes/stuff')

app.use('/stuff', stuffRouter);

app.listen(PORT, () => {
  console.log(`Stuff server listening at http://${HOST}:${PORT}`);
});

