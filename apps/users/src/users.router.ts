import * as express from 'express';
import controller from './users.controller';

const router = express.Router();

router.post('/v1/sign-up', controller.signUp);
router.post('/v1/login', controller.login);

export default router;
