import Joi from 'joi';
import validator from 'express-validation';

import Model from '../../db/models/index';
import wrap from '../../lib/asyncWrapper';

const { Brand } = Model;

const validate = {
  params: Joi.object().keys({
    shopId: Joi.number().integer().required()
  }),
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    offset: Joi.number().integer()
  }),
};

/**
  * paginationCalculation
  * @param {Object} condition pagination condition
  * @returns {Object} return an object
  */
function paginationCalculation(condition) {
  const next = Math.ceil(condition.count / condition.limit);
  const currentPage = Math.floor((condition.offset / condition.limit) + 1);
  const pageSize = condition.limit > condition.count
    ? condition.count : condition.limit;
  return {
    pageCount: next,
    page: currentPage,
    pageSize: Number(pageSize),
    totalCount: condition.count
  };
}

/**
 *
 * @param {object} req
 * @param {object} res
 * @return {object} response object
 */
async function handler(req, res) {
  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;
  const brands = await Brand.findAndCountAll({
    where: { shopId: req.params.shopId }, limit, offset
  });

  const pagination = paginationCalculation({ limit, offset, count: brands.count });

  const data = { brands, pagination };

  res.status(200).json({
    data
  });
}

module.exports = [
  validator(validate),
  wrap(handler)
];
