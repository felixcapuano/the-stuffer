const dotenv = require('dotenv').config();
if (dotenv.error) throw dotenv.error
['HOST','PORT','MONGO_HOST','MONGO_PORT','MONGO_DATABASE','MONGO_USERNAME','MONGO_PASSWORD','ACCESS_TOKEN','REFRESH_TOKEN']
  .forEach(env => { if (!process.env[env]) throw `Environment variable ${env} not set.` }); 

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
  console.log(`Listening at http://${process.env.HOST}:${process.env.PORT}`);
});