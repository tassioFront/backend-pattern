import challengeRouter from '../challenges.router';

describe('Challenges -> Routes', function () {
  it('Should (/v1/create) there are isAuth and isMasterAdmin middleware and in the right order', () => {
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

  it('Should (/v1/get-all) there are paginator middleware', () => {
    const getAllMiddleware = challengeRouter.stack[0].route.stack;
    const pageValidator = getAllMiddleware[0];
    const limitValidator = getAllMiddleware[1];
    expect(pageValidator.name).toBe('middleware'); // anonymous middleware
    expect(limitValidator.name).toBe('middleware'); // anonymous middleware
    expect(getAllMiddleware.length).toBe(3);
  });
});
