import express from 'express';

import config from './config/env';
import Logger from './config/logger';

const NAMESPACE = 'Server';
const app = express();

// Log the request
app.use((req, res, next) => {
  // Log the req
  Logger.info(
    `NAMESPACE: [${NAMESPACE}] - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`,
  );

  res.on('finish', () => {
    // Log the res
    Logger.info(
      `NAMESPACE: [${NAMESPACE}] - METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`,
    );
  });

  next();
});

app.get('/status', (req, res) => {
  res.status(200).end();
});
app.head('/status', (req, res) => {
  res.status(200).end();
});

app.listen(config.port, () => {
  Logger.info(`Listening on port ${config.port}.`);
});
