import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface Challenge {
  title: string;
  desc: string[];
  tags: string[];
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
      type: [],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Challenge', challengeSchema);
