const dotenv = require('dotenv').config();
if (dotenv.error) throw dotenv.error;
const PORT = process.env.AUTH_PORT;

const cookieParser = require('cookie-parser');
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
