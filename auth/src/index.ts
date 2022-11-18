import express from 'express';

import {exampleRouter} from "./routes/example";

const app = express();

// load auth routes
app.use('/api/users',exampleRouter);

app.listen(3002, () => {
    console.log('Listening on port 3002222.')
})

