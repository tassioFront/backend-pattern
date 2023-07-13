import { Express } from 'express-serve-static-core';

export default {
  getAll: (req: Express['request'], res: Express['response']) => {
    res.send({ message: 'Welcome!' });
  },
};
