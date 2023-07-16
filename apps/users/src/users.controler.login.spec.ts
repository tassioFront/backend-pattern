import { UserModel } from '@backend-pattern/models/user';
import { CustomExpress } from '@backend-pattern/@types';
import controller from './users.controller';
import * as helpers from './helpers';

import { throwCustomError } from '@backend-pattern/utils';

const findOne = jest.spyOn(UserModel, 'findOne');

const compare = jest.spyOn(helpers, 'compare').mockResolvedValue(true);
const sign = jest.spyOn(helpers, 'sign');

jest.mock('@backend-pattern/utils', () => {
  const originalModule = jest.requireActual('@backend-pattern/utils');
  return {
    ...originalModule,
    throwCustomError: jest.fn(),
  };
});
describe('Users -> Login controller', function () {
  it('should throw an error with code 500 if accessing the database fails', async () => {
    findOne.mockImplementationOnce(() => {
      throw new Error('Any error');
    });

    const next = jest.fn();
    const status = jest.fn();
    const req = {
      body: {
        email: 'test@test.com',
        password: 'tester',
      },
    } as CustomExpress['request'];

    // @ts-expect-error
    await controller.login(req, { status } as CustomExpress['response'], next);

    expect(next).toBeCalled();
  });

  it('should throw an error with code 401 when given email is wrong or password is not equal to hashed password', async () => {
    findOne.mockResolvedValue(null);
    compare.mockResolvedValue(true);

    const next = jest.fn();
    const status = jest.fn();

    const req = {
      body: {
        email: 'wrong@email.com',
        password: 'tester',
      },
    } as CustomExpress['request'];

    // @ts-expect-error
    await controller.login(req, { status } as CustomExpress['response'], next);

    expect(status).not.toBeCalled();
    expect(throwCustomError).toBeCalledWith({
      msg: 'Email not found or wrong password',
      statusCode: 401,
    });

    findOne.mockResolvedValue({
      email: 'test@tst.com',
      password: 'hash_password',
    });
    compare.mockResolvedValue(false);

    // @ts-expect-error
    await controller.login(req, { status } as CustomExpress['response'], next);
    expect(throwCustomError).toHaveBeenLastCalledWith({
      msg: 'Email not found or wrong password',
      statusCode: 401,
    });
    expect(throwCustomError).toBeCalledTimes(2);

    expect(status).not.toBeCalled();
  });

  it('should login user and return jwt token and user id', async () => {
    findOne.mockResolvedValue({
      email: 'test@test.com',
      password: 'hash_password',
      _id: 1234,
    });
    compare.mockResolvedValue(true);
    sign.mockResolvedValue('any token');

    const next = jest.fn();
    const json = jest.fn();
    const res = {
      status: jest.fn(() => {
        return { json };
      }),
    };

    const req = {
      body: {
        email: 'wrong@email.com',
        password: 'tester',
      },
    } as CustomExpress['request'];

    // @ts-expect-error
    await controller.login(req, res as CustomExpress['response'], next);

    expect(res.status).toBeCalledWith(200);
    expect(json).toBeCalledWith({ id: '1234', token: 'any token' });
  });
});
