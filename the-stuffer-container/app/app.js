const dotenv = require('dotenv').config();
if (dotenv.error) throw dotenv.error
if(!process.env.HOST) throw "Environment variable HOST not set."
if(!process.env.PORT) throw "Environment variable PORT not set."
if(!process.env.MONGO_HOST) throw "Environment variable MONGO_HOST not set."
if(!process.env.MONGO_PORT) throw "Environment variable MONGO_PORT not set."
if(!process.env.MONGO_DATABASE) throw "Environment variable MONGO_DATABASE not set."
if(!process.env.MONGO_USERNAME) throw "Environment variable MONGO_USERNAME not set."
if(!process.env.MONGO_PASSWORD) throw "Environment variable MONGO_PASSWORD nt set."

const express = require('express');
const app = express();

//const path = require('path');
//const dirname = __dirname + '\\front';
//app.use(express.static(path.join(dirname, 'build')));

// middleware
const { validate } = require('./middleware/validation/validation');
const { updateFormatting } = require('./middleware/request-formatting');
const { stcSchema, stuSchema } = require('./middleware/validation/throwing-schema');
const db = require('./middleware/mongo/mongo');

app.use(express.json());

const stuffRouter = express.Router();
app.use('/stuff', stuffRouter);
stuffRouter.use(db.isConnected);

const throwingRouter = express.Router();
throwingRouter.post( '/create', validate(stcSchema), db.createThrowing);
throwingRouter.get( '/get/');
throwingRouter.delete( '/delete/:id', db.isIdValid, db.deleteThrowingStuff);
throwingRouter.get( '/get/:id', db.isIdValid, db.getThrowingByID);
throwingRouter.put( '/update/:id', validate(stuSchema), db.isIdValid, db.updateThrowing);
stuffRouter.use('/throwing', throwingRouter);

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
