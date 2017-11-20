import Joi from 'joi';
import validator from 'express-validation';

import Model from '../../db/models/index';
import wrap from '../../lib/asyncWrapper';

const { productCategory } = Model;

// validates incoming request
const validate = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    shopId: Joi.number().integer().required(),
    parentCategoryId: Joi.number().integer()
  })
};

/**
 *
 * @param {object} req
 * @param {object} res
 * @return {object} response object
 */
async function handler(req, res) {
  const category = await productCategory.create(req.body);
  res.status(201).json({
    data: category
  });
}

module.exports = [
  validator(validate),
  wrap(handler)
];
