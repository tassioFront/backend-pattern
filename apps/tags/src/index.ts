import * as express from 'express';

import { defaultHeaders, onError } from '@backend-pattern/middleware';
import { defaultMongoConnection } from '@backend-pattern/utils';

import tagsRouter from './tags.router';

const app = express();
app.use(express.json());
app.use(defaultHeaders);
app.use(tagsRouter);
app.use(onError);

const port = 4000;
defaultMongoConnection(app, port, 'tags');
