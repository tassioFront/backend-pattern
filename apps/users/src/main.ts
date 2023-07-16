import * as express from 'express';

import { defaultHeaders, onError } from '@backend-pattern/middleware';
import { defaultMongoConnection } from '@backend-pattern/utils';

import usersRouter from './users.router';

const app = express();
app.use(express.json());
app.use(defaultHeaders);
app.use(usersRouter);
app.use(onError);

const port = Number(process.env.port) || 3000;
defaultMongoConnection(app, port, 'users');
