import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface Tags {
  title: string;
}

const schema = new Schema<Tags>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Tags', schema);
