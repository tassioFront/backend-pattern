import controller from '../tags.controller';

jest.mock('@backend-pattern/models/tags');
jest.mock('@backend-pattern/utils', () => {
  const originalModule = jest.requireActual('@backend-pattern/utils');
  return {
    ...originalModule,
    default200Responses: jest.fn(),
    throwCustomError: jest.fn(),
    throwBadRequest: jest.fn(),
  };
});
jest.mock('express-validator');

import { default200Responses, throwCustomError } from '@backend-pattern/utils';
import { validationResult } from 'express-validator';

import { TagsModel } from '@backend-pattern/models/tags';

describe('Tags -> Controller -> update', function () {
  beforeEach(() => {
    default200Responses.mockReset();
    throwCustomError.mockReset();
  });

  it('Should not update as there is not challenge at database', async () => {
    TagsModel.findById.mockResolvedValue(null);
    validationResult.mockReturnValueOnce({
      isEmpty: () => true,
      array: () => [],
    });
    const next = jest.fn();
    const res = {};

    const req = {
      params: {
        id: '123456',
      },
      body: {
        title: 'New one',
      },
    };

    await controller.update(req, res, next);

    expect(default200Responses).not.toBeCalled();
    expect(throwCustomError).toBeCalledWith({
      msg: 'Tag not found!',
      statusCode: 404,
    });
  });

  it('Should update ', async () => {
    TagsModel.findById.mockResolvedValue({
      title: 'HTML',
      save: jest.fn(),
    });
    validationResult.mockReturnValueOnce({
      isEmpty: () => true,
      array: () => [],
    });
    const next = jest.fn();
    const res = {};

    const req = {
      params: {
        id: '123456',
      },
      body: {
        title: 'CSS',
      },
    };

    await controller.update(req, res, next);

    expect(default200Responses).toBeCalled();
    expect(throwCustomError).not.toBeCalledWith();
  });
});
