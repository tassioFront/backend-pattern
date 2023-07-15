import { Express, NextFunction } from 'express-serve-static-core';

import { UserModel, User } from '@backend-pattern/models/user';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

interface UserController {
  signUp: (
    req: Express['request'] & {
      body: User;
    },
    res: Express['response'],
    next: NextFunction
  ) => Promise<void>;
  login: (
    req: Express['request'] & {
      body: User;
    },
    res: Express['response'],
    next: NextFunction
  ) => Promise<void>;
}

const controller: UserController = {
  signUp: async (req: Express['request'], res: Express['response'], next) => {
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
  login: async (req: Express['request'], res: Express['response'], next) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        // error.statusCode = 401;
        throw error;
      }
      // loadedUser = user;
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        const error = new Error('Wrong password!');
        // error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: user.email,
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
