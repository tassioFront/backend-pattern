import {
  Express,
  NextFunction,
  ParamsDictionary,
  Request,
} from 'express-serve-static-core';
import { ParsedQs } from 'qs';

interface userId {
  userId: string;
}

interface CustomExpress<T = any> {
  request: Request<
    ParamsDictionary,
    userId,
    T,
    ParsedQs,
    Record<string, any>
  > & {
    userId: string;
    isMasterAdmin: boolean;
  };
  response: Express['response'];
  next: NextFunction;
  middleware: (
    req: Request<ParamsDictionary, userId, T, ParsedQs, Record<string, any>> & {
      userId: string;
    },
    res: CustomExpress['response'],
    next: CustomExpress['next']
  ) => Promise<void>;
}

export { CustomExpress };
