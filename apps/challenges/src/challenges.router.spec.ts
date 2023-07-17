import challengeRouter from './challenges.router';

describe('Challenges -> Routes', function () {
  it('Should there are isAuth and isMasterAdmin middleware and in the right order', () => {
    const createMiddleware = challengeRouter.stack[1].route.stack;
    const isAuth = createMiddleware[0];
    const isMasterAdmin = createMiddleware[1];

    expect(isAuth).toEqual(
      expect.objectContaining({
        name: 'isAuth',
      })
    );
    expect(isMasterAdmin).toEqual(
      expect.objectContaining({
        name: 'isMasterAdmin',
      })
    );
  });
});
