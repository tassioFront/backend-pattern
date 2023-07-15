import { Express } from 'express-serve-static-core';

import Challenge from './test.model';

export default {
  getAll: async (req: Express['request'], res: Express['response'], next) => {
    try {
      const challenge = await Challenge.find();
      res.status(200).json({
        challenge: challenge || ['empty!'],
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  create: async (req: Express['request'], res: Express['response'], next) => {
    const challenge = new Challenge({
      title: 'My first title',
      content: 'My first content',
    });
    try {
      await challenge.save();
      res.status(201).json({
        message: 'Created!',
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
};
