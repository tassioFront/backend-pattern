import { UserModel } from '@backend-pattern/models/user';
import { CustomExpress } from '@backend-pattern/@types';
import controller from './users.controller';
import * as helpers from './helpers';

const hash = jest.spyOn(helpers, 'hash');

describe('Users -> SignUp controller', function () {
  it.skip('should create user at database', async () => {
    hash.mockResolvedValue('hash_password');
    const next = jest.fn();
    const json = jest.fn();
    const res = {
      status: jest.fn(() => {
        return { json };
      }),
    };
    const req = {
      body: {
        email: 'test@test.com',
        password: 'tester',
      },
    } as CustomExpress['request'];

    // @ts-expect-error
    await controller.signUp(req, res as CustomExpress['response'], next);

    expect(res.status).toBeCalledWith(201);
    expect(json).toBeCalledWith({ message: 'Ok' });
  });

  it.skip('should not create user at database as it already exists', async () => {
    hash.mockResolvedValue('hash_password');
    const next = jest.fn();
    const json = jest.fn();
    const res = {
      status: jest.fn(() => {
        return { json };
      }),
    };
    const req = {
      body: {
        email: 'test@test.com',
        password: 'tester2',
      },
    } as CustomExpress['request'];

    // @ts-expect-error
    await controller.signUp(req, res as CustomExpress['response'], next);

    expect(res.status).not.toBeCalledWith(201);
    expect(json).not.toBeCalledWith({ message: 'Ok' });
    expect(next).toBeCalledWith({
      message: 'User already exists!',
      statusCode: 422,
    });
  });
});
