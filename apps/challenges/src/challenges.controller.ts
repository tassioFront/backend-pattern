import { CustomExpress } from '@backend-pattern/@types';
import { ChallengesModel, Challenge } from '@backend-pattern/models/challenges';

interface ChallengeController {
  getAll: CustomExpress['middleware'];
  create: CustomExpress<Challenge>['middleware'];
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
  create: async (req, res, next) => {
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
