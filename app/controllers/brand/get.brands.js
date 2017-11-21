import Joi from 'joi';
import validator from 'express-validation';

import Model from '../../db/models/index';
import wrap from '../../lib/asyncWrapper';
import paginationMetaData from '../../lib/paginationMetaData';
import paginationData from '../../middleware/paginationData';

const { Brand } = Model;

const validate = {
  params: Joi.object().keys({
    shopId: Joi.number().integer().required()
  }),
  filter: Joi.object().keys({
    limit: Joi.number().integer().required(),
    offset: Joi.number().integer().required(),
    page: Joi.number().integer().required()
  }),
};

/**
 *
 * @param {object} req
 * @param {object} res
 * @return {object} response object
 */
async function handler(req, res) {
  const { limit, offset, page } = req.filter;
  const brands = await Brand.findAndCountAll({
    where: { shopId: req.params.shopId }, limit, offset
  });

  const pagination = paginationMetaData({
    limit, page, count: brands.count, length: brands.rows.length
  });
  const data = { brands, pagination };
  res.status(200).json({
    data
  });
}

module.exports = [
  paginationData,
  validator(validate),
  wrap(handler)
];
