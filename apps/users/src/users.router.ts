import * as express from 'express';
import controller from './users.controller';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/v1/sign-up',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password').trim().isLength({ min: 6 }),
    // body('name').trim().isLength({ min: 3 }), add later
  ],
  controller.signUp
);
router.post(
  '/v1/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password').trim().isLength({ min: 6 }),
  ],
  controller.login
);

export default router;
