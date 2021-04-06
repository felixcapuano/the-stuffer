const dotenv = require('dotenv').config({ path: '../../.env'});
if (dotenv.error) throw dotenv.error
const HOST = process.env.AUTH_HOST;
const PORT = process.env.AUTH_PORT;

const cors = require('cors');
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

app.post('/login', loginRoute);
app.post('/register', registerRoute);
app.post('/token', tokenRoute);
app.delete('/logout', logoutRoute);

app.listen(process.env.PORT, () => {
  console.log(`Listening at http://${HOST}:${PORT}`);
});