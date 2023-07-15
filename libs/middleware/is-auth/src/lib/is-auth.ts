import * as jwt from 'jsonwebtoken';
import { Express, NextFunction } from 'express-serve-static-core';

enum isAuthEnum {
  authHeader = 'Authorization',
}

const isAuth = (
  req: Express['request'],
  _: Express['response'],
  next: NextFunction
) => {
  const authHeader = req.get(isAuthEnum.authHeader);
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    throw { message: error.message, statusCode: 401 };
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRETE);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    throw { message: error.message, statusCode: 401 };
  }
  // @ts-expect-error: types not working
  req.userId = decodedToken.userId;
  next();
};

export { isAuth, isAuthEnum };
