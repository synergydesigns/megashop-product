import Joi from 'joi';
import validator from 'express-validation';

import Model from '../../db/models/index';
import wrap from '../../lib/asyncWrapper';

const { ProductPromo } = Model;

// validates incoming request
const validate = {
  body: Joi.object().keys({
    label: Joi.string().required(),
    price: Joi.number().precision(2),
    productId: Joi.number().integer().min(1).required(),
    shopId: Joi.number().integer().min(1).required(),
    startDate: Joi.date().default(new Date()),
    endDate: Joi.date().required()
  }),
  params: Joi.object().keys({
    productId: Joi.number().integer().min(1).required(),
  })
};

/**
 *
 * @param {object} req
 * @param {object} res
 * @return {object} response object
 */
async function handler(req, res) {
  // @TODO Add check if product exist
  const promo = await ProductPromo.create(req.body);
  res.status(201).json({ data: promo });
}

module.exports = [
  validator(validate),
  wrap(handler)
];
