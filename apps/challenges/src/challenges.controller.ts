import { CustomExpress } from '@backend-pattern/@types';
import { ChallengesModel, Challenge } from '@backend-pattern/models/challenges';
import {
  paginator,
  trycatchfy,
  default200Responses,
  throwCustomError,
  throwOnErrorField,
} from '@backend-pattern/utils';
import { validationResult } from 'express-validator';

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
        const errors = validationResult(req);
        if (!errors?.isEmpty?.()) {
          return throwOnErrorField({ errors });
        }
        const { page, limit } = req.query;
        const result = await paginator<Challenge>({
          page: Number(page),
          limit: Number(limit),
          sortBy: { createdAt: -1 },
          Model: ChallengesModel,
        });
        default200Responses({ res, result });
      },
      next,
    });
  },
  create: async (req, res, next) => {
    return trycatchfy({
      expectedBehavior: async () => {
        const errors = validationResult(req);
        if (!errors?.isEmpty?.()) {
          return throwOnErrorField({ errors });
        }
        const { title, desc, tags } = req.body;
        const challenge = new ChallengesModel({
          title,
          desc,
          tags,
        });
        await challenge.save();
        default200Responses({ res, status: 201 });
      },
      next,
    });
  },
  update: async (req, res, next) => {
    return trycatchfy({
      expectedBehavior: async () => {
        const errors = validationResult(req);
        if (!errors?.isEmpty?.()) {
          return throwOnErrorField({ errors });
        }
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
      next,
    });
  },
  createMany: async (req, res, next) => {
    return trycatchfy({
      expectedBehavior: async () => {
        const errors = validationResult(req);
        if (!errors?.isEmpty?.()) {
          return throwOnErrorField({ errors });
        }
        const { items } = req.body;
        const result = items.map((item) => new ChallengesModel(item));
        await ChallengesModel.bulkSave(result);
        default200Responses({ res, status: 201 });
      },
      next,
    });
  },
};

export default controller;
