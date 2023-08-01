import controller from '../controller';

jest.mock('@backend-pattern/utils', () => {
  const originalModule = jest.requireActual('@backend-pattern/utils');
  return {
    ...originalModule,
    paginator: jest.fn(),
    throwCustomError: jest.fn(),
    throwBadRequest: jest.fn(),
    default200Responses: jest.fn(),
  };
});
jest.mock('express-validator');

import { paginator, default200Responses } from '@backend-pattern/utils';
import { validationResult } from 'express-validator';

describe('Challenges -> Controller -> getAll', function () {
  it('Should return all challenges with status 200 by calling paginator', async () => {
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
    const res = {};

    const req = {
      query: { page: '1', limit: '10' },
    };

    await controller.getAll(req, res, next);

    expect(paginator).toBeCalledWith(
      expect.objectContaining({
        page: 1,
        limit: 10,
        sortBy: { createdAt: -1 },
      })
    );
    expect(default200Responses).toBeCalledWith({
      res,
      result: MOCK_PAGINATOR_RESULT,
    });
  });
});
