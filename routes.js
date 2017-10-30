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

app.use((err, req, res) => {
  if (err) {
    if (err instanceof validate.ValidationError) {
      res.status(400).send({
        status: err.status,
        message: err.statusText,
        errors: err.errors.map(error => ({
          field: error.field[0],
          message: error.messages,
          location: error.location
        }))
      });
    }
    if (err.status) {
      return res
        .status(err.status)
        .send({ message: err.message });
    }
    res.status(500)
      .json({ message: 'Server Error' });
  }
});

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to Mega Shop Product Micro service',
}));

export default app;
