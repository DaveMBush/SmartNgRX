/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express = require('express');
import { router } from './router';
import cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

const port = process.env.port ?? 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
