import * as express from 'express';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/api/teste', (req, res) => {
  return res.send({ message: 'Welcome!""' });
});

app.get('/api', (req, res) => {
  return res.send({ message: 'Welcome!""' });
});

app.get('/', (req, res) => {
  return res.send({ message: 'Welcome!""' });
});
// const port = process.env.port || 3333;
// const server = app.listen(port, () => {
//   process.env.NODE_ENV !== 'production' &&
//     console.log(`Listening at http://localhost:${port}`);
// });
// server.on('error', console.error);

export default app;
