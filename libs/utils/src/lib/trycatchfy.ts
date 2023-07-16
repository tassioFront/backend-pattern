import { NextFunction } from 'express';

interface trycatchfyError {
  expectedBehavior: () => Promise<void>;
  onError?: (error: Error) => void;
  next: NextFunction;
}

export async function trycatchfy({ expectedBehavior, next }: trycatchfyError) {
  try {
    await expectedBehavior();
  } catch (error) {
    next(
      !error.statusCode ? { message: error.message, statusCode: 500 } : error
    );
  }
}
