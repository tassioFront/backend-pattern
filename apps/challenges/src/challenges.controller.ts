import { Express, NextFunction } from 'express-serve-static-core';

import { ChallengesModel, Challenge } from '@backend-pattern/models/challenges';

interface ChallengeController {
  getAll: (
    req: Express['request'],
    res: Express['response'],
    next: NextFunction
  ) => Promise<void>;
  create: (
    req: Express['request'] & {
      body: Challenge;
    },
    res: Express['response'],
    next: NextFunction
  ) => Promise<void>;
}

const controller: ChallengeController = {
  getAll: async (_, res, next) => {
    try {
      const challenges = await ChallengesModel.find();
      res.status(200).json({
        message: 'Ok',
        challenges,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  create: async (req: Express['request'], res: Express['response'], next) => {
    try {
      const { title, desc, tags } = req.body;
      const challenge = new ChallengesModel({
        title,
        desc,
        tags,
      });
      await challenge.save();
      res.status(201).json({
        message: 'Ok',
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
};

export default controller;
