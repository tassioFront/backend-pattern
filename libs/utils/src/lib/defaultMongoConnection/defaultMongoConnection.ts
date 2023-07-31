import { Express } from 'express-serve-static-core';

import mongoose from 'mongoose';

export const defaultMongoConnection = (
  app: Express,
  port: number,
  serviceName: string
) => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB_KEY}.mongodb.net/?retryWrites=true&w=majority`
    )
    .then((_) => {
      app.listen(port, () => {
        process.env.NODE_ENV !== 'production' &&
          console.log(
            `Listening at http://localhost:${port}`,
            `Service name: ${serviceName}`
          );
      });
    })
    .catch((error) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(
          `MongoDB: Looks something went wrong, brother: Service name: ${serviceName}`
        );
        console.error(error);
      }
    });
};
