import { CustomExpress } from '@backend-pattern/@types';
import { isAuthEnum } from '../isAuth/isAuth';

export const defaultHeaders = (
  _,
  res: CustomExpress['response'],
  next: CustomExpress['next']
) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, ' + isAuthEnum.authHeader
  );
  next();
};
