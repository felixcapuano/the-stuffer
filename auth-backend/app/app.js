require('dotenv').config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

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

app.use(express.json());
app.use(cookieParser());

app.post('/login', loginRoute);
app.post('/register', registerRoute);
app.get('/token', tokenRoute);
app.delete('/logout', logoutRoute);
app.get('/ping', (req, res) => res.json({ ok: true, server: 'auth-backend' }));

const PORT = process.env.PORT;
if (!PORT) throw new Error('PORT not set.');
app.listen(PORT, () => {
  console.log(`Auth server listening on port : ${PORT}`);
});
