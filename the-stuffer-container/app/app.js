
const express = require('express');
const app = express();

//const path = require('path');
//const dirname = __dirname + '\\front';
//app.use(express.static(path.join(dirname, 'build')));

const { validate } = require('./validation/validation');
const { handler } = require('./routes/handler');

const { slcSchema, sluSchema, sldSchema, slgSchema } = require('./validation/stuff/landing-schema');
const { stcSchema, stuSchema, stdSchema, stgSchema } = require('./validation/stuff/throwing-schema');

const { stcProcess } = require('./routes/stuff/throwing/st-create');
const { stdProcess } = require('./routes/stuff/throwing/st-delete');
const { stgProcess } = require('./routes/stuff/throwing/st-get');
const { stuProcess } = require('./routes/stuff/throwing/st-update');

const { slcProcess } = require('./routes/stuff/landing/st-create');
const { sldProcess } = require('./routes/stuff/landing/st-delete');
const { slgProcess } = require('./routes/stuff/landing/st-get');
const { sluProcess } = require('./routes/stuff/landing/st-update');

const PORT = process.env.PORT || 9000;

app.use(express.json());

app.post( '/stuff/throwing/create', validate(stcSchema), handler(stcProcess));
app.delete( '/stuff/throwing/delete', validate(stdSchema), handler(stdProcess));
app.get(  '/stuff/throwing/get'   , validate(stgSchema), handler(stgProcess));
app.put(  '/stuff/throwing/update', validate(stuSchema), handler(stuProcess));

app.post('/stuff/landing/create', validate(slcSchema), handler(slcProcess));
app.delete('/stuff/landing/delete', validate(sldSchema), handler(sldProcess));
app.get( '/stuff/landing/get'   , validate(slgSchema), handler(slgProcess));
app.put( '/stuff/landing/update', validate(sluSchema), handler(sluProcess));

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
})