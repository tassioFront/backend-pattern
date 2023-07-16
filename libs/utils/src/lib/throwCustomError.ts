interface throwCustomError {
  msg: string;
  statusCode: number;
}

export function throwCustomError({ msg, statusCode }: throwCustomError): void {
  throw { message: new Error(msg).message, statusCode };
}
