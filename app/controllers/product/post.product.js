import Joi from 'joi';
import validator from 'express-validation';

import Model from '../../models/index';
import wrap from '../../../lib/asyncWrapper';

const { Product } = Model;


const validate = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().default(0.00),
    categoryId: Joi.array().items(Joi.number().integer()).required(),
    sku: Joi.string().required(),
    quantity: Joi.number().default(0),
    available: Joi.boolean().default(true),
    visible: Joi.boolean().default(true),
    brandId: Joi.number(),
    shopId: Joi.number().required(),
    description: Joi.string().default(''),
    downloadable: Joi.boolean().default(false)
  })
};

/**
 *
 * @param {object} req
 * @param {object} res
 * @return {object} response object
 */
async function handler(req, res) {
  const product = await Product.create(req.body);
  return res.status(201).json({
    data: product
  });
}

module.exports = [
  validator(validate),
  wrap(handler)
];
