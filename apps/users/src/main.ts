import express from 'express';

const app = express();

app.get('/users', (req, res) => {
  res.send({ message: 'Welcome to users!' });
});

const port = 9090;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
