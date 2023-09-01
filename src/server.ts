import cors from 'cors';
import express, { Application } from 'express';

import httpStatus from 'http-status';

import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(httpStatus.OK).send('Hello World!');
});
