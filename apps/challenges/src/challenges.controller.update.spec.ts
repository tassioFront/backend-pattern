import { CustomExpress } from '@backend-pattern/@types';
import controller from './challenges.controller';

jest.mock('@backend-pattern/models/challenges');
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

import {
  default200Responses,
  throwOnErrorField,
  throwCustomError,
} from '@backend-pattern/utils';

import { validationResult } from 'express-validator';
import { ChallengesModel } from '@backend-pattern/models/challenges';

describe('Challenges -> Controller -> update', function () {
  beforeEach(() => {
    validationResult.mockReset();
    throwOnErrorField.mockReset();
    default200Responses.mockReset();
    throwCustomError.mockReset();
  });

  it('Should throw as there is an error at validator', async () => {
    validationResult.mockReturnValueOnce({
      isEmpty: () => false,
      array: () => [{ msg: 'something went wrong' }],
    });
    const next = jest.fn();
    const res = {};

    // @ts-expect-error
    const req = {
      params: {
        id: '123456',
      },
      body: {
        title: 'My challenge',
        tags: ['123'],
        desc: ['first description', '<p>second</p>'],
      },
    } as CustomExpress['request'];

    // @ts-expect-error
    await controller.update(req, res as CustomExpress['response'], next);

    expect(throwOnErrorField).toBeCalled();
    expect(default200Responses).not.toBeCalled();
    expect(throwCustomError).not.toBeCalled();
  });
  it('Should not update as there is not challenge at database', async () => {
    ChallengesModel.findById.mockResolvedValue(null);
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

    // @ts-expect-error
    const req = {
      params: {
        id: '123456',
      },
      body: {
        title: 'My challenge',
        tags: ['123'],
        desc: ['first description', '<p>second</p>'],
      },
    } as CustomExpress['request'];

    // @ts-expect-error
    await controller.update(req, res as CustomExpress['response'], next);

    expect(default200Responses).not.toBeCalled();
    expect(throwCustomError).toBeCalledWith({
      msg: 'Challenge not found!',
      statusCode: 404,
    });
    expect(throwOnErrorField).not.toBeCalled();
  });

  it('Should update ', async () => {
    ChallengesModel.findById.mockResolvedValue({
      title: 'My challenge',
      tags: ['123'],
      desc: ['first description', '<p>second</p>'],
      save: jest.fn(),
    });
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

    // @ts-expect-error
    const req = {
      params: {
        id: '123456',
      },
      body: {
        title: 'New Title',
        tags: ['456'],
        desc: ['other description', '<p>editing</p>'],
      },
    } as CustomExpress['request'];

    // @ts-expect-error
    await controller.update(req, res as CustomExpress['response'], next);

    expect(default200Responses).toBeCalled();
    expect(throwCustomError).not.toBeCalledWith();
    expect(throwOnErrorField).not.toBeCalled();
  });
});
