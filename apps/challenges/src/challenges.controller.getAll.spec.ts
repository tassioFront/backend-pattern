import { CustomExpress } from '@backend-pattern/@types';
import controller from './challenges.controller';
import { Challenge, ChallengesModel } from '@backend-pattern/models/challenges';

const find = jest.spyOn(ChallengesModel, 'find');

describe('Challenges -> Controller -> getAll', function () {
  it('Should return all challenges with status 200', async () => {
    find.mockResolvedValue([
      {
        _id: '64b2eff69bbde2163faaead9',
        desc: ['um', 'dois'],
        tags: ['b'],
        title: 'title',
      },
    ]);
    const next = jest.fn();
    const json = jest.fn();
    const res = {
      status: jest.fn(() => {
        return { json };
      }),
    };

    const req = {} as CustomExpress['request'];

    // @ts-expect-error
    await controller.getAll(req, res as CustomExpress['response'], next);

    expect(res.status).toBeCalledWith(200);
    expect(json).toBeCalledWith({
      challenges: [
        {
          _id: '64b2eff69bbde2163faaead9',
          desc: ['um', 'dois'],
          tags: ['b'],
          title: 'title',
        },
      ],
      message: 'Ok',
    });
  });
});
