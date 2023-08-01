import { CustomExpress } from '@backend-pattern/@types';
import { TagsModel, Tags } from '@backend-pattern/models/tags';
import {
  trycatchfy,
  default200Responses,
  throwCustomError,
} from '@backend-pattern/utils';

interface TagsController {
  getAll: CustomExpress['middleware'];
  create: CustomExpress<Tags>['middleware'];
  update: CustomExpress<Tags>['middleware'];
}

const controller: TagsController = {
  getAll: async (req, res, next) => {
    return trycatchfy({
      expectedBehavior: async () => {
        const result = await TagsModel.find();
        default200Responses({ res, result });
      },
      req,
      next,
    });
  },
  create: async (req, res, next) => {
    return trycatchfy({
      expectedBehavior: async () => {
        const { title } = req.body;
        const challenge = new TagsModel({
          title,
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
        const tag = await TagsModel.findById(req.params.id);
        if (!tag) {
          return throwCustomError({
            msg: 'Tag not found!',
            statusCode: 404,
          });
        }
        const { title } = req.body;
        tag.title = title;
        await tag.save();
        default200Responses({ res, status: 200 });
      },
      req,
      next,
    });
  },
};

export default controller;
