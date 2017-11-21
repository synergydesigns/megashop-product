import Joi from 'joi';
import validator from 'express-validation';

const validate = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  }),
};
/**
 *
 *  @param {Object} req handler
 *  @param {Object} res handler
 *  @param {Object} next handler
 *  @returns {void} nothing to return
 */
const paginationData = (req, res, next) => {
  const limit = req.query.limit || 100;
  const page = req.query.page || 1;
  const offset = limit * (page - 1);
  req.filter = { limit, offset, page };
  next();
};

module.exports = [
  validator(validate),
  paginationData
];
