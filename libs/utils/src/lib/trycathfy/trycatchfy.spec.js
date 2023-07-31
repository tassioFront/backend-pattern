import { INTERNAL_SERVER_ERROR, trycatchfy } from './trycatchfy';
jest.mock('express-validator');
jest.mock('../throwCustomError/throwCustomError');
import { validationResult } from 'express-validator';
import { throwBadRequest } from '../throwCustomError/throwCustomError';

describe('Utils -> trycatchfy', () => {
  it('should throw as there is an error at validator', async () => {
    validationResult.mockReturnValueOnce({
      isEmpty: () => false,
      array: () => [{ msg: 'something went wrong' }],
    });
    const params = {
      expectedBehavior: jest.fn().mockImplementation(() => {
        throw new Error('error on db');
      }),
      next: jest.fn(),
    };
    await trycatchfy(params);
    expect(throwBadRequest).toBeCalled();
  });
  it('should call next with the error and status code default', async () => {
    validationResult.mockReturnValueOnce({
      isEmpty: () => true,
      array: () => [],
    });
    const params = {
      expectedBehavior: jest.fn().mockImplementation(() => {
        throw new Error('error on db');
      }),
      next: jest.fn(),
    };
    await trycatchfy(params);
    expect(params.next).toBeCalledWith({
      message: INTERNAL_SERVER_ERROR,
      statusCode: 500,
    });
  });

  it('should call expectedBehavior only', () => {
    validationResult.mockReturnValueOnce({
      isEmpty: () => true,
      array: () => null,
    });
    const params = {
      expectedBehavior: jest.fn().mockReturnValue(new Error('error on db')),
      next: jest.fn(),
    };

    trycatchfy(params);
    expect(params.next).not.toBeCalled();
    expect(params.expectedBehavior).toBeCalled();
  });
});
