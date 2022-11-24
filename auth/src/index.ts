import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import config from './config/env';
import Logger from './config/logger';
import { Item } from './models/item';

const NAMESPACE = 'Server';
const app = express();

const start = async () => {
  // Connect to Mongo
  try {
    await mongoose.connect(config.mongo.url, config.mongo.options);

    Logger.info(`NAMESPACE: [${NAMESPACE}] - Mongo Connected`);
  } catch (err) {
    Logger.error(`NAMESPACE: [${NAMESPACE}] - Error: [${err}]`);
  }

  // Parse json request body
  app.use(express.json());

  // parse urlencoded request body
  app.use(express.urlencoded({ extended: true }));

  // Listen app
  app.listen(config.server.port);

  // Log the request
  app.use((req, res, next) => {
    // Log the req
    Logger.info(
      `NAMESPACE: [${NAMESPACE}] - METHOD: [${req.method}] - URL: [${req.url}] - BODY: [${JSON.stringify(
        req.body,
      )}] - IP: [${req.socket.remoteAddress}]`,
    );

    res.on('finish', () => {
      // Log the res
      Logger.info(
        `NAMESPACE: [${NAMESPACE}] - METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`,
      );
    });

    next();
  });

  // Health Check endpoints
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  app.post('/item/create', async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const item = Item.build({ name, description });
    await item.save();
    res.status(201).json(item);
  });
};

start()
  .then(() =>
    Logger.info(
      `NAMESPACE: [${NAMESPACE}] - [NAME_OF_APP] app was successfully started and listening on port ${config.server.port}`,
    ),
  )
  .catch((err) => {
    Logger.error(`NAMESPACE: [${NAMESPACE}] - Error: [${err}]`);
    process.exit(1);
  });
