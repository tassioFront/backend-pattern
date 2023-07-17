import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface User {
  email: string;
  password: string;
  isMasterAdmin: boolean;
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
    isMasterAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
