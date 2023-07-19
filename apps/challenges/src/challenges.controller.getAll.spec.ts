import { CustomExpress } from '@backend-pattern/@types';
import controller from './challenges.controller';

jest.mock('@backend-pattern/utils', () => {
  const originalModule = jest.requireActual('@backend-pattern/utils');
  return {
    ...originalModule,
    paginator: jest.fn(),
    throwCustomError: jest.fn(),
    throwOnErrorField: jest.fn(),
  };
});

jest.mock('express-validator');

import { paginator, throwOnErrorField } from '@backend-pattern/utils';
import { validationResult } from 'express-validator';

describe('Challenges -> Controller -> getAll', function () {
  beforeEach(() => {
    validationResult.mockReset();
  });
  it('Should throw an error as it has a invalid param', async () => {
    validationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => [{ msg: 'something went wrong' }],
    });
    const next = jest.fn();
    const json = jest.fn();
    const res = {
      status: jest.fn(() => {
        return { json };
      }),
    };

    const req = {
      query: { page: 'WRONG!', limit: 10 },
    } as CustomExpress['request'];

    await controller.getAll(req, res, next);

    expect(res.status).not.toBeCalled();
    expect(throwOnErrorField).toBeCalled();
    expect(json).not.toBeCalled();
    // @ts-expect-error
    throwOnErrorField.mockReset();
  });
  it('Should return all challenges with status 200', async () => {
    validationResult.mockReturnValue({
      isEmpty: () => true,
    });

    const MOCK_PAGINATOR_RESULT = {
      totalPages: 10,
      currentPage: 1,
      items: [
        {
          _id: '64b2eff69bbde2163faaead9',
          desc: ['um', 'dois'],
          tags: ['b'],
          title: 'title',
        },
      ],
    };
    paginator.mockResolvedValue(MOCK_PAGINATOR_RESULT);
    const next = jest.fn();
    const json = jest.fn();
    const res = {
      status: jest.fn(() => {
        return { json };
      }),
    };

    const req = {
      query: { page: '1', limit: '10' },
    } as CustomExpress['request'];

    // @ts-expect-error
    await controller.getAll(req, res as CustomExpress['response'], next);

    expect(res.status).toBeCalledWith(200);
    expect(throwOnErrorField).not.toBeCalled();
    expect(json).toBeCalledWith({
      ...MOCK_PAGINATOR_RESULT,
      message: 'Ok',
    });
  });
});
