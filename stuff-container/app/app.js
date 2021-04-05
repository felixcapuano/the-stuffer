const dotenv = require('dotenv').config();
if (dotenv.error) throw dotenv.error
const envs = ['HOST','PORT','MONGO_HOST','MONGO_PORT','MONGO_DATABASE','MONGO_USERNAME','MONGO_PASSWORD'];
envs.forEach(env => {
  if (!process.env[env]) throw "Environment variable HOST not set."
  console.log(env+'='+process.env[env]);
});

const cors = require('cors');
const express = require('express');
const app = express();

require('./mongo/core').connect();

app.use(express.json());
app.use(cors());

const stuffRouter = require('./routes/stuff')

app.use('/stuff', stuffRouter);


app.listen(process.env.PORT, () => {
  console.log(`Listening at http://${process.env.HOST}:${process.env.PORT}`);
});

