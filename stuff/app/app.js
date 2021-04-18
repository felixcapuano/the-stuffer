const dotenv = require('dotenv').config();
if (dotenv.error) throw dotenv.error;
const PORT = process.env.STUFF_PORT;

const cors = require('cors');
const express = require('express');
const app = express();

require('./mongo/core').connect();

app.use(express.json());
app.use(
  cors({
    origin: `http://${process.env.THESTUFFER_HOST}:${process.env.THESTUFFER_PORT}`,
    credentials: true,
  })
);

const stuffRouter = require('./routes/stuff');

app.use('/stuff', stuffRouter);

app.listen(PORT, () => {
  console.log(`Stuff server listenning on port : ${PORT}`);
});
