import { isMasterAdmin } from './isMasterAdmin';
describe('isMasterAdmin middleware', function () {
  it('should throw an error if user is not master admin', function () {
    const next = jest.fn();
    const req = {
      isMasterAdmin: false,
    };
    expect(isMasterAdmin.bind(this, req, {}, next)).toThrow(
      'Looks you are trying to do something not allowed!'
    );
    expect(next).not.toBeCalled();
  });

  it('should allow next middleware', async function () {
    const next = jest.fn();
    const req = {
      isMasterAdmin: true,
    };
    // @ts-expect-error
    await isMasterAdmin(req, {}, next);
    expect(next).toBeCalled();
  });
});
