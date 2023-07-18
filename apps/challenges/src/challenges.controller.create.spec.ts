import { CustomExpress } from '@backend-pattern/@types';
import controller from './challenges.controller';
import { Challenge, ChallengesModel } from '@backend-pattern/models/challenges';
import mongoose from 'mongoose';

describe('Challenges -> Controller -> create', function () {
  it('Should save challenge at database', async () => {
    const next = jest.fn();
    const json = jest.fn();
    const res = {
      status: jest.fn(() => {
        return { json };
      }),
    };

    const req = {
      body: {
        title: 'My challenge',
        tags: ['html'],
        desc: ['first description', '<p>second</p>'],
      },
    } as CustomExpress['request'];

    // @ts-expect-error
    await controller.create(req, res as CustomExpress['response'], next);

    expect(res.status).toBeCalledWith(201);
    expect(json).toBeCalledWith({
      message: 'Ok',
    });

    await ChallengesModel.deleteOne({ title: 'My challenge' });
  });
});
