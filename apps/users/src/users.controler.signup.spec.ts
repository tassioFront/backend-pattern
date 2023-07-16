import { UserModel } from '@backend-pattern/models/user';
import { CustomExpress } from '@backend-pattern/@types';
import controller from './users.controller';
import * as helpers from './helpers';
import mongoose from 'mongoose';

const hash = jest.spyOn(helpers, 'hash');

describe('Users -> SignUp controller', function () {
  beforeAll(async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB_KEY}.mongodb.net/?retryWrites=true&w=majority`
      );
    } catch (error) {
      console.log(error);
    }
  });
  it('should create user at database', async () => {
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

  afterAll(async () => {
    await UserModel.deleteOne({ email: 'test@test.com' });
    await mongoose.disconnect();
  });
});
