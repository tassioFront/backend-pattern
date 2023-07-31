import { Express } from 'express-serve-static-core';

interface IDefault200Responses<T> {
  res: Express['response'];
  status?: 200 | 201;
  result?: T;
}
export const default200Responses = <T>({
  res,
  status = 200,
  result = undefined,
}: IDefault200Responses<T>) =>
  res.status(status).json({ result, message: 'Ok' });
