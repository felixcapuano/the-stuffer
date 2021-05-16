require('dotenv').config();
if (!process.env.ACCESS_TOKEN)
  throw new Error('Env variable ACCESS_TOKEN not set');
if (!process.env.REFRESH_TOKEN)
  throw new Error('Env variable ACCESS_TOKEN not set');

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const isAuth = require('./auth');

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

const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const tokenRoute = require('./routes/token');
const logoutRoute = require('./routes/logout');
const { getUser } = require('./routes/user');
const { sendEmail, verifyEmail } = require('./routes/email');

app.use(express.json());
app.use(cookieParser());

app.post('/login', loginRoute);
app.post('/register', registerRoute);
app.get('/token', tokenRoute);
app.delete('/logout', logoutRoute);
app.get('/user', isAuth, getUser);
app.get('/email/send', isAuth, sendEmail);
app.post('/email/verify', isAuth, verifyEmail);
app.get('/ping', (req, res) => res.json({ ok: true, server: 'auth-backend' }));

const PORT = process.env.PORT;
if (!PORT) throw new Error('PORT not set.');
app.listen(PORT, () => {
  console.log(`Auth server listening on port : ${PORT}`);
});
