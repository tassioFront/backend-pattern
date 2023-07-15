import express from 'express';

const app = express();

app.get('/users', (req, res) => {
  res.send({ message: 'Welcome to GCP, users!' });
});

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
