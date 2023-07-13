import * as express from 'express';

const router = express.Router();

router.get('/challenges', (req, res) => {
  res.send({ message: 'Welcome!' });
});

export default router;
