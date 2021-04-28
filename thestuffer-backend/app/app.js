const dotenv = require('dotenv').config();
if (dotenv.error) throw dotenv.error;
const PORT = process.env.STUFF_PORT;

const express = require('express');
const app = express();

require('./mongo/core').connect();

if (process.env.NODE_ENV === 'development') {
  console.log('Development server use CORS');
  app.use(
    require('cors')({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
}

app.use(express.json());

const stuffRouter = require('./routes/stuff');

app.use('/stuff', stuffRouter);
app.get('/ping', (req, res) =>
  res.json({ ok: true, server: 'thestuffer-backend' })
);

app.listen(PORT, () => {
  console.log(`Stuff server listenning on port : ${PORT}`);
});
