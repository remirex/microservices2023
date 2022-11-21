import express from 'express';

import {exampleRouter} from "./routes/example";
import config from './config/env';

const app = express();

// load auth routes
app.use('/api/users',exampleRouter);

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}.`)
})

