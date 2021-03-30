const dotenv = require('dotenv').config();
if (dotenv.error) throw dotenv.error
const envs = ['HOST','PORT','MONGO_HOST','MONGO_PORT','MONGO_DATABASE','MONGO_USERNAME','MONGO_PASSWORD'];
envs.forEach(env => {
  if (!process.env[env]) throw "Environment variable HOST not set."
  console.log(env+'='+process.env[env]);
});

const express = require('express');
const app = express();

// middleware
const db = require('./middleware/mongo/mongo');
const { validation } = require('./middleware/validation/validation')

app.use(express.json());

const stuffRouter = express.Router();
app.use('/stuff', stuffRouter);

stuffRouter.use(db.isConnected);
// TO TEST
//stuffRouter.use(db.isIdValid);

stuffRouter.post('/:collection/create', validation('create'), db.createStuff);
stuffRouter.delete('/:collection/delete/:id', db.isIdValid, db.deleteStuff);
stuffRouter.get('/:collection/get/:id', db.isIdValid, db.getStuff);
stuffRouter.put('/:collection/update/:id', validation('update'), db.isIdValid, db.updateStuff);
stuffRouter.post('/:collection/search', validation('search'), db.searchStuff);

const launchServer = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Listening at http://${process.env.HOST}:${process.env.PORT}`);
  });
}

launchServer();
db.connect();
