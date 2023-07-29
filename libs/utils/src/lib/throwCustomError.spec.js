import { throwCustomError, throwBadRequest } from './throwCustomError';

describe('Utils -> throwCustomError', () => {
  it('should throw error with given message and status code', () => {
    expect(() =>
      throwCustomError({ msg: 'error message', statusCode: 401 })
    ).toThrow('error message');
  });
  it('should throw error with given error validator object and status code to field error', () => {
    const errors = { array: () => [{ msg: 'my given error!' }] };
    expect(() => throwBadRequest({ errors })).toThrow('my given error!');
  });
});
