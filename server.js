import http from 'http';
import dotenv from 'dotenv';
import logger from 'js-logger';
import app from './config/app';

dotenv.config({ silence: true });
logger.useDefaults();
const port = parseInt(process.env.PORT, 10);
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
logger.info(`MEGASHOP PRODUCT SERVER is running on ${process.env.HOST}:${port}/`);
