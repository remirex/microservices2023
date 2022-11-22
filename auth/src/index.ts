import express from 'express';

import { exampleRouter } from './routes/example';
import config from './config/env';
import Logger from './config/logger';

const app = express();

// load auth routes
app.use('/api/users', exampleRouter);

app.listen(config.port, () => {
  Logger.info(`Listening on port ${config.port}.`);
});
