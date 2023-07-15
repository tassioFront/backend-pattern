import * as express from 'express';
import mongoose from 'mongoose';

import { isAuthEnum } from '@backend-pattern/middleware/is-auth';
import { CustomExpress } from '@backend-pattern/@types';

import usersRouter from './users.router';

const app = express();

app.use(express.json());

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, ' + isAuthEnum.authHeader
  );
  next();
});

app.use(usersRouter);

app.use(
  (
    error,
    req: CustomExpress['request'],
    res: CustomExpress['response'],
    _: CustomExpress['next']
  ) => {
    process.env.NODE_ENV !== 'production' &&
      console.log('Looks something went wrong, brother', error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data });
  }
);

const port = process.env.port || 3000;
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB_KEY}.mongodb.net/?retryWrites=true&w=majority`
  )
  .then((result) => {
    app.listen(port, () => {
      process.env.NODE_ENV !== 'production' &&
        console.log(`Listening at http://localhost:${port}`);
    });
  })
  .catch(
    (error) =>
      process.env.NODE_ENV !== 'production' &&
      console.log('Looks something went wrong, brother', error)
  );
