// import { CustomExpress } from '@backend-pattern/@types';

import { UserModel, User } from '@backend-pattern/models/user';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { CustomExpress } from '@backend-pattern/@types';

interface UserController {
  signUp: CustomExpress<User>['middleware'];
  login: CustomExpress<User>['middleware'];
}

const controller: UserController = {
  signUp: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const hashedPw = await bcrypt.hash(password, 12);
      const user = new UserModel({
        email,
        password: hashedPw,
      });
      await user.save();
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
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        throw { message: error.message, statusCode: 401 };
      }
      // loadedUser = user;
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        const error = new Error('Wrong password!');
        throw { message: error.message, statusCode: 401 };
      }
      const token = jwt.sign(
        {
          userId: user._id.toString(),
        },
        process.env.JWT_SECRETE,
        { expiresIn: '1h' }
      );
      res.status(200).json({ token, id: user._id.toString() });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
};

export default controller;
