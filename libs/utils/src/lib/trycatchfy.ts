import { NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { throwBadRequest } from './throwCustomError';
import { CustomExpress } from '@backend-pattern/@types';

interface trycatchfyError {
  expectedBehavior: () => Promise<void>;
  onError?: (error: Error) => void;
  next: NextFunction;
  req: CustomExpress['request'];
}

export const INTERNAL_SERVER_ERROR =
  'Sorry, looks we are out :/ Try again later';

export async function trycatchfy({
  expectedBehavior,
  next,
  req,
}: trycatchfyError) {
  try {
    const errors = validationResult(req);
    if (!errors?.isEmpty?.()) {
      return throwBadRequest({ errors });
    }
    await expectedBehavior();
  } catch (error) {
    next(
      !error.statusCode
        ? { message: INTERNAL_SERVER_ERROR, statusCode: 500 }
        : error
    );
  }
}
