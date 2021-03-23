const express = require('express');
const app = express();

//const path = require('path');
//const dirname = __dirname + '\\front';
//app.use(express.static(path.join(dirname, 'build')));

const { validate } = require('./validation/validation');
const { handler } = require('./routes/handler');

const { slcSchema, sluSchema } = require('./validation/stuff/landing-schema');
const { stcSchema, stuSchema } = require('./validation/stuff/throwing-schema');

const { stcProcess } = require('./routes/stuff/throwing/st-create');
const { stdProcess } = require('./routes/stuff/throwing/st-delete');
const { stgProcess } = require('./routes/stuff/throwing/st-get');
const { stuProcess } = require('./routes/stuff/throwing/st-update');

const { slcProcess } = require('./routes/stuff/landing/sl-create');
const { sldProcess } = require('./routes/stuff/landing/sl-delete');
const { slgProcess } = require('./routes/stuff/landing/sl-get');
const { sluProcess } = require('./routes/stuff/landing/sl-update');

const PORT = process.env.PORT || 9000;

app.use(express.json());

const stuffRouter = express.Router();

const throwingRouter = express.Router();
app.use('/stuff', stuffRouter);
stuffRouter.use('/throwing', throwingRouter)
throwingRouter.post( '/create', validate(stcSchema), handler(stcProcess));
throwingRouter.delete( '/delete/:id', handler(stdProcess));
throwingRouter.get( '/get/', handler(stgProcess));
throwingRouter.get( '/get/:id', handler(stgProcess));
throwingRouter.put( '/update/:id', validate(stuSchema), handler(stuProcess));

//const landingRouter = express.Router();
//stuffRouter.use('/landing', landingRouter)
//landingRouter.post( '/create', validate(slcSchema), handler(slcProcess));
//landingRouter.delete( '/delete', validate(sldSchema), handler(sldProcess));
//landingRouter.get( '/get', validate(slgSchema), handler(slgProcess));
//landingRouter.put( '/update', validate(sluSchema), handler(sluProcess));

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
})