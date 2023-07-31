import controller from '../challenges.controller';

jest.mock('@backend-pattern/utils', () => {
  const originalModule = jest.requireActual('@backend-pattern/utils');
  return {
    ...originalModule,
    default200Responses: jest.fn(),
    throwCustomError: jest.fn(),
  };
});
jest.mock('express-validator');
jest.mock('@backend-pattern/models/challenges');

import { validationResult } from 'express-validator';

import { default200Responses } from '@backend-pattern/utils';

describe('Challenges -> Controller -> create', function () {
  it('Should save challenge at database', async () => {
    validationResult.mockReturnValueOnce({
      isEmpty: () => true,
      array: () => [],
    });
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
        tags: ['123'],
        desc: ['first description', '<p>second</p>'],
      },
    };

    await controller.create(req, res, next);

    expect(default200Responses).toBeCalled();
  });
});
