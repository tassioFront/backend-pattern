import mongoose, { SchemaTypeOptions, Types } from 'mongoose';
const Schema = mongoose.Schema;

export interface Challenge {
  title: string;
  desc: string[];
  tags: Types.Array<Types.ObjectId>;
}

const challengeSchema = new Schema<Challenge>(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: [],
      required: true,
    },
    tags: {
      ref: 'Tag',
      type: [Types.ObjectId],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Challenge', challengeSchema);
