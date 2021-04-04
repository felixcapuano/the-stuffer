const dotenv = require('dotenv').config();
if (dotenv.error) throw dotenv.error
const envs = ['HOST','PORT'];
envs.forEach(env => {
  if (!process.env[env]) throw "Environment variable HOST not set."
  console.log(env+'='+process.env[env]);
});

const cors = require('cors');
const express = require('express');
const app = express();

const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')

app.use(express.json());
app.use(cors());

app.post('/login', loginRoute);
app.post('/register', registerRoute);

app.listen(process.env.PORT, () => {
  console.log(`Listening at http://${process.env.HOST}:${process.env.PORT}`);
});