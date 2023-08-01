import controller from '../controller';

jest.mock('@backend-pattern/models/tags');
jest.mock('@backend-pattern/utils', () => {
  const originalModule = jest.requireActual('@backend-pattern/utils');
  return {
    ...originalModule,
    throwCustomError: jest.fn(),
    throwBadRequest: jest.fn(),
    default200Responses: jest.fn(),
  };
});
jest.mock('express-validator');

import { default200Responses } from '@backend-pattern/utils';
import { validationResult } from 'express-validator';

describe('Tags -> Controller -> getAll', function () {
  it('Should return all tags with status 200', async () => {
    validationResult.mockReturnValue({
      isEmpty: () => true,
    });
    const next = jest.fn();
    const res = {};
    const req = {};

    await controller.getAll(req, res, next);

    expect(default200Responses).toBeCalled();
  });
});
