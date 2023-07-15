import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface User {
  email: string;
  password: string;
}

const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
