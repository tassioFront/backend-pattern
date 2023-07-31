import * as express from 'express';

import { isAuth, isMasterAdmin } from '@backend-pattern/middleware';

import controller from './tags.controller';
import {
  body,
  param,
} from 'express-validator/src/middlewares/validation-chain-builders';

const router = express.Router();
const insertValidators = [
  body('title')
    .isString()
    .trim()
    .isLength({ min: 2, max: 10 })
    .withMessage('title must be a string and 10 >= length >= 2'),
];

router.get('/v1/get-all', controller.getAll);
router.post(
  '/v1/create',
  // isAuth,
  // isMasterAdmin,
  ...insertValidators,
  controller.create
);
router.put(
  '/v1/update/:id',
  isAuth,
  isMasterAdmin,
  param('id')
    .isString()
    .trim()
    .isLength({ min: 24, max: 24 })
    .withMessage('ID not allowed!'),
  ...insertValidators,
  controller.update
);

export default router;
