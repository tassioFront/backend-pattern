import { CustomExpress } from '@backend-pattern/@types';
import { ChallengesModel, Challenge } from '@backend-pattern/models/challenges';
import { trycatchfy } from '@backend-pattern/utils';

interface ChallengeController {
  getAll: CustomExpress['middleware'];
  create: CustomExpress<Challenge>['middleware'];
}

const controller: ChallengeController = {
  getAll: async (_, res, next) => {
    return trycatchfy({
      expectedBehavior: async () => {
        const challenges = await ChallengesModel.find();
        res.status(200).json({
          message: 'Ok',
          challenges,
        });
      },
      next,
    });
  },
  create: async (req, res, next) => {
    return trycatchfy({
      expectedBehavior: async () => {
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
      },
      next,
    });
  },
};

export default controller;
