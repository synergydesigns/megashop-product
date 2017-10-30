import Joi from 'joi';
import validator from 'express-validation';

import Models from '../../models/index';

const validate = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().default(0.00),
    categoryId: Joi.array().items(Joi.number().integer()).required(),
    sku: Joi.string().required(),
    quantity: Joi.number().default(0),
    available: Joi.boolean().default(true),
    visible: Joi.boolean().default(true),
    brand_id: Joi.number(),
    shop_id: Joi.number().required(),
    description: Joi.string(),
    downloadable: Joi.boolean().default(false)
  })
};

/**
 *
 * @param {object} req
 * @param {object} res
 * @return {object} response object
 */
function handler(req, res) {
  res.status(201).json({
    body: req.body
  });
}

module.exports = [
  validator(validate),
  handler
];
