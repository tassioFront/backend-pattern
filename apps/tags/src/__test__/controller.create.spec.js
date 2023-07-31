import controller from '../tags.controller';

jest.mock('@backend-pattern/utils', () => {
  const originalModule = jest.requireActual('@backend-pattern/utils');
  return {
    ...originalModule,
    default200Responses: jest.fn(),
    throwCustomError: jest.fn(),
  };
});
jest.mock('express-validator');
jest.mock('@backend-pattern/models/tags');

import { validationResult } from 'express-validator';

import { default200Responses } from '@backend-pattern/utils';

describe('Tags -> Controller -> create', function () {
  it('Should save tags at database', async () => {
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
        title: 'HTML',
      },
    };

    await controller.create(req, res, next);

    expect(default200Responses).toBeCalled();
  });
});
