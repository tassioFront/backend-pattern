import { CustomExpress } from '@backend-pattern/@types';
import { ChallengesModel, Challenge } from '@backend-pattern/models/challenges';
import {
  paginator,
  trycatchfy,
  throwOnErrorField,
} from '@backend-pattern/utils';
import { validationResult } from 'express-validator';

interface ChallengeController {
  getAll: CustomExpress['middleware'];
  create: CustomExpress<Challenge>['middleware'];
}

const controller: ChallengeController = {
  getAll: async (req, res, next) => {
    return trycatchfy({
      expectedBehavior: async () => {
        const { page, limit } = req.query;
        const errors = validationResult(req);
        if (!errors?.isEmpty?.()) {
          return throwOnErrorField({ errors });
        }
        const result = await paginator<Challenge>({
          page: Number(page),
          limit: Number(limit),
          sortBy: { createdAt: -1 },
          Model: ChallengesModel,
        });
        res.status(200).json({ ...result, message: 'Ok' });
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
