import * as express from 'express';

import {
  isAuth,
  isMasterAdmin,
  paginatorQueryValidator,
} from '@backend-pattern/middleware';

import controller from './challenges.controller';

const router = express.Router();
const validators = paginatorQueryValidator();

router.get('/v1/get-all', ...validators, controller.getAll);
router.post('/v1/create', isAuth, isMasterAdmin, controller.create);

export default router;
