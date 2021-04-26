const dotenv = require('dotenv').config();
if (dotenv.error) throw dotenv.error;
const PORT = process.env.AUTH_PORT;

const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const mongo = require('./mongo/core');
mongo.connect();

const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const tokenRoute = require('./routes/token');
const logoutRoute = require('./routes/logout');

app.use(express.json());
app.use(cookieParser());

app.post('/login', loginRoute);
app.post('/register', registerRoute);
app.get('/token', tokenRoute);
app.delete('/logout', logoutRoute);
app.get('/ping', (req, res) => res.json({ ok: true, server: 'auth-backend' }));

app.listen(PORT, () => {
  console.log(`Auth server listening on port : ${PORT}`);
});
