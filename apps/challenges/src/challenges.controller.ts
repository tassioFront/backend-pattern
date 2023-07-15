import { Express } from 'express-serve-static-core';

export default {
  getAll: (req: Express['request'], res: Express['response']) => {
    return res.send({ message: 'GCP is also working as expected!' });
  },
};
