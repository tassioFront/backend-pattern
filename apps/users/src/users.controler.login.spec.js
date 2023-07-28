import controller from './users.controller';

jest.mock('./helpers');
jest.mock('@backend-pattern/models/user');
jest.mock('express-validator');
jest.mock('@backend-pattern/utils', () => {
  const originalModule = jest.requireActual('@backend-pattern/utils');
  return {
    ...originalModule,
    throwCustomError: jest.fn(),
    default200Responses: jest.fn(),
    throwOnErrorField: jest.fn(),
  };
});
import { UserModel } from '@backend-pattern/models/user';
import {
  throwCustomError,
  default200Responses,
  throwOnErrorField,
} from '@backend-pattern/utils';
import { validationResult } from 'express-validator';
import { compare, sign } from './helpers';

describe('Users -> Login controller', function () {
  beforeEach(() => {
    throwCustomError.mockReset();
    default200Responses.mockReset();
    throwOnErrorField.mockReset();
  });
  it('should throw an error with code 401 when do not not find user', async () => {
    UserModel.findOne.mockResolvedValue(null);
    compare.mockResolvedValue(true);
    validationResult.mockReturnValueOnce({
      isEmpty: () => true,
      array: () => [],
    });
    const next = jest.fn();

    const req = {
      body: {
        email: 'wrong@email.com',
        password: 'tester',
      },
    };

    await controller.login(req, {}, next);

    expect(default200Responses).not.toBeCalled();
    expect(throwCustomError).toBeCalledWith({
      msg: 'Email not found or wrong password',
      statusCode: 401,
    });
  });

  it('should throw an error with code 401 when given password is not equal to hashed password', async () => {
    UserModel.findOne.mockResolvedValue({
      email: 'test@test.com',
      password: 'hash_password',
      _id: 1234,
      isMasterAdmin: false,
    });
    compare.mockResolvedValue(false);
    validationResult.mockReturnValueOnce({
      isEmpty: () => true,
      array: () => [],
    });
    const next = jest.fn();

    const req = {
      body: {
        email: 'wrong@email.com',
        password: 'tester',
      },
    };

    await controller.login(req, {}, next);

    expect(default200Responses).not.toBeCalled();
    expect(throwCustomError).toBeCalledWith({
      msg: 'Email not found or wrong password',
      statusCode: 401,
    });
  });
  it('should login user and return jwt token and user id', async () => {
    UserModel.findOne.mockResolvedValue({
      email: 'test@test.com',
      password: 'hash_password',
      _id: 1234,
      isMasterAdmin: false,
    });
    compare.mockResolvedValue(true);
    sign.mockResolvedValue('any token');
    validationResult.mockReturnValueOnce({
      isEmpty: () => true,
      array: () => [],
    });

    const next = jest.fn();
    const req = {
      body: {
        email: 'wrong@email.com',
        password: 'tester',
      },
    };

    await controller.login(req, {}, next);

    expect(default200Responses).toBeCalled();
    expect(throwCustomError).not.toBeCalled();
    expect(throwOnErrorField).not.toBeCalled();
    expect(sign).toBeCalledWith({ userId: '1234', isMasterAdmin: false });
  });
});
