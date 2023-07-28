import { CustomExpress } from '@backend-pattern/@types';
import { ChallengesModel, Challenge } from '@backend-pattern/models/challenges';
import {
  paginator,
  trycatchfy,
  default200Responses,
  throwCustomError,
} from '@backend-pattern/utils';

interface ChallengeController {
  getAll: CustomExpress['middleware'];
  create: CustomExpress<Challenge>['middleware'];
  update: CustomExpress<Challenge>['middleware'];
  createMany: CustomExpress<{ items: Challenge[] }>['middleware'];
}

const controller: ChallengeController = {
  getAll: async (req, res, next) => {
    return trycatchfy({
      expectedBehavior: async () => {
        const { page, limit } = req.query;
        const result = await paginator<Challenge>({
          page: Number(page),
          limit: Number(limit),
          sortBy: { createdAt: -1 },
          Model: ChallengesModel,
        });
        default200Responses({ res, result });
      },
      req,
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
        default200Responses({ res, status: 201 });
      },
      req,
      next,
    });
  },
  update: async (req, res, next) => {
    return trycatchfy({
      expectedBehavior: async () => {
        const challenge = await ChallengesModel.findById(req.params.id);
        if (!challenge) {
          return throwCustomError({
            msg: 'Challenge not found!',
            statusCode: 404,
          });
        }
        const { title, desc, tags } = req.body;
        challenge.title = title;
        challenge.desc = desc;
        challenge.tags = tags;
        await challenge.save();
        default200Responses({ res, status: 201 });
      },
      req,
      next,
    });
  },
  createMany: async (req, res, next) => {
    return trycatchfy({
      expectedBehavior: async () => {
        const { items } = req.body;
        const result = items.map((item) => new ChallengesModel(item));
        await ChallengesModel.bulkSave(result);
        default200Responses({ res, status: 201 });
      },
      req,
      next,
    });
  },
};

export default controller;
