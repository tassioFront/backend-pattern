import mongoose from 'mongoose';

beforeAll(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB_KEY}.mongodb.net/?retryWrites=true&w=majority`
    );
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
});
