import { default200Responses } from './default200Responses';

describe('Utils -> throwCustomError', () => {
  const json = jest.fn();
  const res = {
    status: jest.fn(() => {
      return { json };
    }),
  };
  it('should call response with default status code and message:ok only', () => {
    default200Responses({ res });
    expect(res.status).toBeCalledWith(200);
    expect(json).toBeCalledWith({ message: 'Ok' });
  });
  it('should call response with given status code and result', () => {
    const result = {
      id: 123,
      items: ['some', 'nice', 'response'],
    };
    default200Responses({ res, result, status: 201 });
    expect(res.status).toBeCalledWith(201);
    expect(json).toBeCalledWith({ ...result, message: 'Ok' });
  });
});
