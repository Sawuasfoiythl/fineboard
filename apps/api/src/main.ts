import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { Message } from '@fineboard/api-interfaces';
import { handleScreenshots } from './app/handle-screenshots';

const app = express();

const greeting: Message = { message: 'Welcome to api!' };

app.get('/api', (req, res) => {
  res.send(greeting);
});

const port = process.env.port || 3333;

app.get('/api/assets/nx-logo.png', (req, res) => {
  res.header('Cache-Control', 'no-cache');
  const r = fs.createReadStream(
    path.join(__dirname, '../../../', 'assets', 'screenshot.jpg')
  );
  r.pipe(res);
});

const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);

setInterval(() => handleScreenshots(), 500);
