import Request from 'supertest';
import app from '../routes';

const request = new Request(app);

export default request;