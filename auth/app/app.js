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
app.use(cors());
app.use(cookieParser());

app.post('/login', loginRoute);
app.post('/register', registerRoute);
app.post('/token', tokenRoute);
app.delete('/logout', logoutRoute);

const { verify } = require('jsonwebtoken');
app.get('/testing', async (req, res) => {
  console.log(req)
  //if (!req.body.token) return res.send({ ok: false, msg:'no token'})

  //const valid = verify(req.cookies.jid, process.env.ACCESS_TOKEN);
  //if (!valid) return res.send({ ok: false, msg:'invalid token'})

  res.send({ ok: true, msg: ''});
});

app.listen(PORT, () => {
  console.log(`Auth server listening at http://${HOST}:${PORT}`);
});