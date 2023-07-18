import { NextFunction } from 'express';

interface trycatchfyError {
  expectedBehavior: () => Promise<void>;
  onError?: (error: Error) => void;
  next: NextFunction;
}

export const INTERNAL_SERVER_ERROR =
  'Sorry, looks we are out :/ Try again later';

export async function trycatchfy({ expectedBehavior, next }: trycatchfyError) {
  try {
    await expectedBehavior();
  } catch (error) {
    next(
      !error.statusCode
        ? { message: INTERNAL_SERVER_ERROR, statusCode: 500 }
        : error
    );
  }
}
