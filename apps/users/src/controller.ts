import { UserModel, User } from '@backend-pattern/models/user';
import {
  default200Responses,
  throwCustomError,
  trycatchfy,
} from '@backend-pattern/utils';
import { CustomExpress } from '@backend-pattern/@types';
import { compare, sign, hash } from './helpers';

interface UserController {
  signUp: CustomExpress<User>['middleware'];
  login: CustomExpress<User>['middleware'];
}

const controller: UserController = {
  signUp: async (req, res, next) => {
    return trycatchfy({
      expectedBehavior: async () => {
        const { email, password } = req.body;
        const userExists = await UserModel.find({
          email,
        });
        if (userExists.length > 0) {
          return throwCustomError({
            msg: 'User already exists!',
            statusCode: 422,
          });
        }
        const hashedPw = await hash(password);
        const user = new UserModel({
          email,
          password: hashedPw,
        });
        await user.save();
        default200Responses({ res, status: 201 });
      },
      req,
      next,
    });
  },
  login: async (req, res, next) => {
    return trycatchfy({
      expectedBehavior: async () => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const isEqual = await compare(password, user?.password || '');
        if (!user?.email || !isEqual) {
          return throwCustomError({
            msg: 'Email not found or wrong password',
            statusCode: 401,
          });
        }
        const userId = user._id.toString();
        const token = await sign({ userId, isMasterAdmin: user.isMasterAdmin });
        default200Responses({ res, result: { token, id: userId } });
      },
      req,
      next,
    });
  },
};

export default controller;
