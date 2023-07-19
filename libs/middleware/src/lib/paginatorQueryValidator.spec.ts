import { paginatorQueryValidator } from './paginatorQueryValidator';

describe('middleware -> paginatorQueryValidator', () => {
  it('Should return the middleware with required options from paginator', async () => {
    const result = paginatorQueryValidator();
    const pageField = result[0].builder.build();
    const limitField = result[1].builder.build();

    expect(pageField.fields[0]).toEqual('page');
    expect(pageField.stack[0]).toMatchObject({
      message: 'page field must be numeric!',
    });
    expect(pageField.stack[1]).toMatchObject({
      message: 'page field must be greater than 0!',
    });

    expect(limitField.fields[0]).toEqual('limit');
    expect(limitField.stack[0]).toMatchObject({
      message: 'limit field must be numeric!',
    });
    expect(limitField.stack[1]).toMatchObject({
      message: 'limit field must be greater than 0!',
    });
  });
});
