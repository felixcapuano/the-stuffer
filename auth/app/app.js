const dotenv = require('dotenv').config({ path: '../../.env'});
if (dotenv.error) throw dotenv.error
const HOST = process.env.AUTH_HOST;
const PORT = process.env.AUTH_PORT;

const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const mongo = require('./mongo/core');
mongo.connect();

const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')
const tokenRoute = require('./routes/token');
const logoutRoute = require('./routes/logout');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: `http://${process.env.THESTUFFER_HOST}:${process.env.THESTUFFER_PORT}`,
  credentials: true,
}));

app.post('/login', loginRoute);
app.post('/register', registerRoute);
app.get('/token', tokenRoute);
app.delete('/logout', logoutRoute);

const { verify } = require('jsonwebtoken');
app.post('/testing', async (req, res) => {
  const accessToken = req.headers.authorization?.split(' ')[1]
  if (!accessToken) return res.send({ ok: false, message:'need to login'})

  try {
    const valid = verify(accessToken, process.env.ACCESS_TOKEN);
  } catch (error) {
    console.error(error)
    return res.send({ ok: false, message:''})
  }

  res.send({ ok: true, message: ''});
});

app.listen(PORT, () => {
  console.log(`Auth server listening at http://${HOST}:${PORT}`);
});