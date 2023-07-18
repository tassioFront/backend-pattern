import * as jwt from 'jsonwebtoken';
import { CustomExpress } from '@backend-pattern/@types';
import {
  INTERNAL_SERVER_ERROR,
  throwCustomError,
} from '@backend-pattern/utils';

enum isAuthEnum {
  authHeader = 'Authorization',
}

const notAuthenticatedErrorParam = {
  msg: 'Not authenticated.',
  statusCode: 401,
};

const isAuth = (
  req: CustomExpress['request'],
  _: CustomExpress['response'],
  next: CustomExpress['next']
) => {
  const authHeader = req.get(isAuthEnum.authHeader);
  if (!authHeader) {
    return throwCustomError(notAuthenticatedErrorParam);
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRETE);
  } catch (err) {
    return throwCustomError({ msg: INTERNAL_SERVER_ERROR, statusCode: 500 });
  }
  if (!decodedToken) {
    return throwCustomError(notAuthenticatedErrorParam);
  }
  req.userId = decodedToken.userId;
  req.isMasterAdmin = decodedToken.isMasterAdmin;
  next();
};

export { isAuth, isAuthEnum };
