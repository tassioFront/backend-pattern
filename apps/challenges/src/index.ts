import * as express from 'express';

const app = express();

import challengeRouter from './challenges.router';

app.use(challengeRouter);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// const port = process.env.port || 3333;
// const server = app.listen(port, () => {
//   process.env.NODE_ENV !== 'production' &&
//     console.log(`Listening at http://localhost:${port}`);
// });
// server.on('error', console.error);

export default app;
