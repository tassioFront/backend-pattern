import * as express from 'express';

import { isAuth } from '@backend-pattern/middleware';

import controller from './challenges.controller';

const router = express.Router();

router.get('/v1/get-all', controller.getAll);
router.post('/v1/create', isAuth, controller.create);

export default router;
