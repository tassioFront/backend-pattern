import { query } from 'express-validator/src/middlewares/validation-chain-builders';

export const paginatorQueryValidator = () => {
  const factory = (field: string) =>
    query(field)
      .isNumeric()
      .withMessage(field + ' field must be numeric!')
      .custom((value) => value > 0)
      .withMessage(field + ' field must be greater than 0!');

  const page = () => {
    return factory('page');
  };

  const limit = () => {
    return factory('limit');
  };
  return [page, limit];
};
