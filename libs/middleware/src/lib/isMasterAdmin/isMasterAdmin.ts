import { CustomExpress } from '@backend-pattern/@types';
import { throwCustomError } from '@backend-pattern/utils';

const forbiddenErrorParam = {
  msg: 'Looks you are trying to do something not allowed!',
  statusCode: 403,
};

const isMasterAdmin = (
  req: CustomExpress['request'],
  _: CustomExpress['response'],
  next: CustomExpress['next']
) => {
  const isMasterAdmin = req?.isMasterAdmin;
  if (!isMasterAdmin) {
    return throwCustomError(forbiddenErrorParam);
  }
  next();
};

export { isMasterAdmin };
