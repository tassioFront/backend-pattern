import * as jwt from 'jsonwebtoken';
import { CustomExpress } from '@backend-pattern/@types';

enum isAuthEnum {
  authHeader = 'Authorization',
}

const isAuth = (
  req: CustomExpress['request'],
  _: CustomExpress['response'],
  next: CustomExpress['next']
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
  req.userId = decodedToken.userId;
  next();
};

export { isAuth, isAuthEnum };
