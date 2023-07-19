import { Model, SortOrder } from 'mongoose';
interface Paginator {
  page: number;
  limit: number;
  Model: Model<any>;
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
}: Paginator) => {
  const items: T[] = await Model.find()
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
