import { ValidationError } from 'express-validator/src/base';
import { Result } from 'express-validator/src/validation-result';

interface throwCustomError {
  msg: string;
  statusCode: number;
}

interface throwOnErrorField {
  errors: Result<ValidationError>;
}

export function throwCustomError({ msg, statusCode }: throwCustomError): void {
  throw { message: new Error(msg).message, statusCode };
}

export function throwOnErrorField({ errors }: throwOnErrorField): void {
  return throwCustomError({
    msg: errors.array()?.[0]?.msg,
    statusCode: 400,
  });
}
