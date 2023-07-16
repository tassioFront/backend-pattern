import { CustomExpress } from '@backend-pattern/@types';

export const onError = (
  error,
  req: CustomExpress['request'],
  res: CustomExpress['response'],
  _: CustomExpress['next']
) => {
  process.env.NODE_ENV !== 'production' &&
    console.log('Looks something went wrong, brother', error);
  error.statusCode = error.statusCode || 500;
  res.status(error.statusCode).json(error);
};
