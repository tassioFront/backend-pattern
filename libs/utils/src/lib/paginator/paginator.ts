import { Model, SortOrder, FilterQuery } from 'mongoose';
interface Paginator<T> {
  page: number;
  limit: number;
  Model: Model<T>;
  findParam?: FilterQuery<any>;
  sortBy:
    | string
    | { [key: string]: SortOrder | { $meta: 'textScore' } }
    | [string, SortOrder][];
}

export const paginator = async <T>({
  page,
  limit = 10,
  Model,
  sortBy,
  findParam,
}: Paginator<T>) => {
  const items: T[] = await Model.find(findParam)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort(sortBy);

  const count = await Model.countDocuments();

  return {
    items,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
};
