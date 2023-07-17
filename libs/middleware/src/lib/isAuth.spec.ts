import * as jwt from 'jsonwebtoken';
import { CustomExpress } from '@backend-pattern/@types';

const verify = jest.spyOn(jwt, 'verify');

import { isAuth } from './isAuth';
describe('Auth middleware', function () {
  it('should throw an error if no authorization header is present', function () {
    const req = {
      get: function (headerName) {
        return null;
      },
    };
    expect(isAuth.bind(this, req, {}, () => null)).toThrow(
      'Not authenticated.'
    );
  });

  it('should throw an error if the authorization header is only one string', function () {
    const req = {
      get: function (headerName) {
        return 'xyz';
      },
    };
    expect(isAuth.bind(this, req, {}, () => null)).toThrow(
      'jwt must be provided'
    );
  });

  it('should throw an error if the token cannot be verified', function () {
    const req = {
      get: function (headerName) {
        return 'Bearer xyz';
      },
    };
    expect(isAuth.bind(this, req, {}, () => null)).not.toThrow('sads');
  });

  it('should yield a userId after decoding the token', function () {
    verify.mockReturnValue({ userId: 'abc', isMasterAdmin: false });

    const req = {
      get: function (headerName) {
        return 'Bearer djfkalsdjfaslfjdlas';
      },
    } as CustomExpress['request'];
    isAuth(req, {} as CustomExpress['response'], () => null);
    expect(req).toHaveProperty('userId', 'abc');
    expect(req).toHaveProperty('isMasterAdmin', false);
    expect(verify).toBeCalled();
    verify.mockClear();
  });
});
