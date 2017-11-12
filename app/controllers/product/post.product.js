import Joi from 'joi';
import validator from 'express-validation';

import Model from '../../db/models/index';
import wrap from '../../lib/asyncWrapper';

const { Product, ProductSku, sequelize } = Model;

// validates incoming request
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
  // setup transaction case product creation fails
  const transaction = await sequelize.transaction();
  try {
    const { sku, shopId } = req.body;
    const product = await Product.create(req.body, { transaction });
    if (product) {
      const productSku = await ProductSku.create({
        sku,
        shopId,
        productId: product.id
      }, { transaction });

      await transaction.commit();

      const productResponse = { ...product.dataValues, sku: productSku.sku };
      const categoryId = productResponse.categoryId.split(',').map(key => parseInt(key, 10));
      return res.status(201).json({
        data: Object
          .assign({}, productResponse, { categoryId })
      });
    }
  } catch (e) {
    await transaction.rollback();
    throw (e);
  }
}

module.exports = [
  validator(validate),
  wrap(handler)
];
