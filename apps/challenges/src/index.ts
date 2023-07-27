import * as express from 'express';

import { defaultHeaders, onError } from '@backend-pattern/middleware';
import { defaultMongoConnection } from '@backend-pattern/utils';

import challengeRouter from './challenges.router';

const app = express();
app.use(express.json());
app.use(defaultHeaders);
app.use(challengeRouter);
app.use(onError);

const port = 8080;
defaultMongoConnection(app, port, 'challenges');
