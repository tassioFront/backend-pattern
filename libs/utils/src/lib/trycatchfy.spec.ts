import { trycatchfy } from './trycatchfy';

describe('Utils -> trycatchfy', () => {
  it('should call next with the error and status code default', async () => {
    const params = {
      expectedBehavior: jest.fn().mockImplementation(() => {
        throw new Error('error on db');
      }),
      next: jest.fn(),
    };
    await trycatchfy(params);
    expect(params.next).toBeCalledWith({
      message: 'error on db',
      statusCode: 500,
    });
  });

  it('should call expectedBehavior only', () => {
    const params = {
      expectedBehavior: jest.fn().mockReturnValue(new Error('error on db')),
      next: jest.fn(),
    };

    trycatchfy(params);
    expect(params.next).not.toBeCalled();
    expect(params.expectedBehavior).toBeCalled();
  });
});
