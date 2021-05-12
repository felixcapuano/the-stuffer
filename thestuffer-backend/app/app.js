require('dotenv').config();
if (!process.env.ACCESS_TOKEN)
  throw new Error('Env variable ACCESS_TOKEN not set');
if (!process.env.REFRESH_TOKEN)
  throw new Error('Env variable ACCESS_TOKEN not set');

const express = require('express');
const app = express();

if (process.env.NODE_ENV !== 'production') {
  console.log('Startup: development');

  app.use(
    require('cors')({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
} else console.log('Startup: production');

require('./mongo/core').connect();

app.use(express.json());

const stuffRouter = require('./routes/stuff');

app.use('/stuff', stuffRouter);
app.get('/ping', (req, res) =>
  res.json({ ok: true, server: 'thestuffer-backend' })
);

const PORT = process.env.PORT;
if (!PORT) throw new Error('PORT not set.');
app.listen(PORT, () => {
  console.log(`Stuff server listenning on port : ${PORT}`);
});
