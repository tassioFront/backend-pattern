import { CustomExpress } from '@backend-pattern/@types';
import controller from './challenges.controller';

jest.mock('@backend-pattern/utils', () => {
  const originalModule = jest.requireActual('@backend-pattern/utils');
  return {
    ...originalModule,
    default200Responses: jest.fn(),
    throwCustomError: jest.fn(),
    throwOnErrorField: jest.fn(),
  };
});
jest.mock('express-validator');
jest.mock('@backend-pattern/models/challenges');

import { default200Responses, throwOnErrorField } from '@backend-pattern/utils';

import { validationResult } from 'express-validator';

describe('Challenges -> Controller -> create', function () {
  beforeEach(() => {
    validationResult.mockReset();
    throwOnErrorField.mockReset();
  });

  it('Should throw as there is an error at validator', async () => {
    validationResult.mockReturnValueOnce({
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
      body: {
        title: 'My challenge',
        tags: ['123'],
        desc: ['first description', '<p>second</p>'],
      },
    } as CustomExpress['request'];

    // @ts-expect-error
    await controller.create(req, res as CustomExpress['response'], next);

    expect(throwOnErrorField).toBeCalled();
    expect(default200Responses).not.toBeCalled();
  });
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
    } as CustomExpress['request'];

    // @ts-expect-error
    await controller.create(req, res as CustomExpress['response'], next);

    expect(default200Responses).toBeCalled();
    expect(throwOnErrorField).not.toBeCalled();
  });
});
