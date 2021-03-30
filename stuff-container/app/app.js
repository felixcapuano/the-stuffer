const dotenv = require('dotenv').config();
if (dotenv.error) throw dotenv.error
if (!process.env.HOST) throw "Environment variable HOST not set."
if (!process.env.PORT) throw "Environment variable PORT not set."
if (!process.env.MONGO_HOST) throw "Environment variable MONGO_HOST not set."
if (!process.env.MONGO_PORT) throw "Environment variable MONGO_PORT not set."
if (!process.env.MONGO_DATABASE) throw "Environment variable MONGO_DATABASE not set."
if (!process.env.MONGO_USERNAME) throw "Environment variable MONGO_USERNAME not set."
if (!process.env.MONGO_PASSWORD) throw "Environment variable MONGO_PASSWORD nt set."

const express = require('express');
const app = express();

//const path = require('path');
//const dirname = __dirname + '\\front';
//app.use(express.static(path.join(dirname, 'build')));

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

//const landingRouter = express.Router();
//landingRouter.post( '/create', validate(slcSchema), handler(slcProcess));
//landingRouter.delete( '/delete', validate(sldSchema), handler(sldProcess));
//landingRouter.get( '/get', validate(slgSchema), handler(slgProcess));
//landingRouter.put( '/update', validate(sluSchema), handler(sluProcess));
//stuffRouter.use('/landing', landingRouter);

const launchServer = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Listening at http://${process.env.HOST}:${process.env.PORT}`);
  });
}

launchServer();
db.connect();
