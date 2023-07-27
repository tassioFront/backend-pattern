import * as express from 'express';

import {
  isAuth,
  isMasterAdmin,
  paginatorQueryValidator,
} from '@backend-pattern/middleware';

import controller from './challenges.controller';
import {
  body,
  param,
} from 'express-validator/src/middlewares/validation-chain-builders';

const router = express.Router();
const validators = paginatorQueryValidator();
const insertValidators = [
  body('title')
    .isString()
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage('title must be a string and 20 >= length >= 5'),
  body('desc')
    .isArray({ min: 1, max: 20 })
    .withMessage('desc must be an array and 20 >= length >= 1 ')
    .custom((items: string[]) => {
      const result = items.every((item) =>
        Boolean(
          typeof item === 'string' && item.length > 10 && 50 > item.length
        )
      );
      if (!result) {
        return Promise.reject(
          'each desc must be an string and 50 >= length >= 10 '
        );
      }
      return result;
    }),
];

router.get('/v1/get-all', ...validators, controller.getAll);
router.post(
  '/v1/create',
  isAuth,
  isMasterAdmin,
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
router.post('/v1/create-many', isAuth, isMasterAdmin, controller.createMany);

export default router;
