import { throwCustomError } from './throwCustomError';

describe('Utils -> throwCustomError', () => {
  it('should throw error with given message and status code', () => {
    expect(() =>
      throwCustomError({ msg: 'error message', statusCode: 401 })
    ).toThrow('error message');
  });
});
