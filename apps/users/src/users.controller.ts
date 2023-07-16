import { UserModel, User } from '@backend-pattern/models/user';
import { throwCustomError, trycatchfy } from '@backend-pattern/utils';
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
        const hashedPw = await hash(password);
        const user = new UserModel({
          email,
          password: hashedPw,
        });
        await user.save();
        res.status(201).json({
          message: 'Ok',
        });
      },
      next,
    });
  },
  login: async (req, res, next) => {
    return trycatchfy({
      expectedBehavior: async () => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const isEqual = await compare(password, user?.password);
        if (!user || !isEqual) {
          return throwCustomError({
            msg: 'Email not found or wrong password',
            statusCode: 401,
          });
        }

        const userId = user._id.toString();
        const token = await sign(userId);
        res.status(200).json({ token, id: userId });
      },
      next,
    });
  },
};

export default controller;
