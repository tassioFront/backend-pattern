import { isMasterAdmin } from './isMasterAdmin';
describe('isMasterAdmin middleware', function () {
  it('should throw an error if user is not master admin', function () {
    const next = jest.fn();
    const req = {
      isMasterAdmin: false,
    };
    expect(next).not.toBeCalled();
    expect(isMasterAdmin.bind(this, req, {}, next)).toThrow(
      'Looks you are trying to do something not allowed!'
    );
  });

  it('should allow next middleware', function () {
    const next = jest.fn();
    const req = {
      isMasterAdmin: true,
    };
    expect(next).toBeCalled();
    expect(isMasterAdmin.bind(this, req, {}, next)).not.toThrow();
  });
});
