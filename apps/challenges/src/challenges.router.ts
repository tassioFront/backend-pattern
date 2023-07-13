import * as express from 'express';
import controller from './challenges.controller';

const router = express.Router();

router.get('/challenges', controller.getAll);

export default router;
