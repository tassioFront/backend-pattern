import * as jwt from 'jsonwebtoken';
import { Express } from 'express-serve-static-core';

const verify = jest.spyOn(jwt, 'verify');

import { isAuth } from './is-auth';
describe('Auth middleware', function () {
  it('should throw an error if no authorization header is present', function () {
    const req = {
      get: function (headerName) {
        return null;
      },
    };
    expect(isAuth.bind(this, req, {}, () => {})).toThrow('Not authenticated.');
  });

  it('should throw an error if the authorization header is only one string', function () {
    const req = {
      get: function (headerName) {
        return 'xyz';
      },
    };
    expect(isAuth.bind(this, req, {}, () => {})).toThrow(
      'jwt must be provided'
    );
  });

  it('should throw an error if the token cannot be verified', function () {
    const req = {
      get: function (headerName) {
        return 'Bearer xyz';
      },
    };
    expect(isAuth.bind(this, req, {}, () => {})).not.toThrow('sads');
  });

  it('should yield a userId after decoding the token', function () {
    verify.mockReturnValue({ userId: 'abc' });

    const req = {
      get: function (headerName) {
        return 'Bearer djfkalsdjfaslfjdlas';
      },
    } as Express['request'];
    isAuth(req, {} as Express['response'], () => {});
    expect(req).toHaveProperty('userId');
    expect(req).toHaveProperty('userId', 'abc');
    expect(verify).toBeCalled();
    verify.mockClear();
  });
});
