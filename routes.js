import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import validate from 'express-validation';


const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

validate.options({
  status: 422
});

// routes
router.post('/products', require('./app/controllers/product/post.product'));

app.use('/api/v1', router);

app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof validate.ValidationError) {
      res.status(400).send({
        status: err.status,
        message: err.statusText,
        errors: err.errors.map(error => ({
          field: error.field[0],
          message: error.messages[0],
          location: error.location
        }))
      });
    }
    next();
  }
});

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to Mega Shop Product Microservice',
}));

export default app;
