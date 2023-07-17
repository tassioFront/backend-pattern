import * as express from 'express';

import { isAuth, isMasterAdmin } from '@backend-pattern/middleware';

import controller from './challenges.controller';

const router = express.Router();

router.get('/v1/get-all', controller.getAll);
router.post('/v1/create', isAuth, isMasterAdmin, controller.create);

export default router;
