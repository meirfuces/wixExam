import express from 'express';

import bodyParser = require('body-parser');
import { serverAPIPort, APIPath } from '../configuration';

console.log('starting server', { serverAPIPort, APIPath });
const cors = require("cors");

const app = express();

app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/', require('./routes'))

app.listen(serverAPIPort);
console.log('server running, Meir Exam', serverAPIPort)

