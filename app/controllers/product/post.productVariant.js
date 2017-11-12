import Joi from 'joi';
import validator from 'express-validation';

import Model from '../../db/models/index';
import wrap from '../../lib/asyncWrapper';

const {
  productVariantMeta,
  ProductVariant,
  ProductSku,
  sequelize
} = Model;


const validate = {
  body: Joi.object().keys({
    variants: Joi.array().items(Joi.object().keys({
      name: Joi.string().required(),
      sku: Joi.string().required(),
      asset: Joi.number().integer(),
      weight: Joi.number().integer(),
      quantity: Joi.number().integer().default(0),
      price: Joi.number().integer(),
      productId: Joi.number().integer(1).required(),
      meta: Joi.array().items(Joi.object().keys({
        key: Joi.string().required(),
        value: Joi.string().required()
      }).min(1).required()).required()
    })).min(1),
    shopId: Joi.number().integer().min(1).required()
  }).required().with('variants', 'shopId'),
  params: Joi.object().keys({
    productId: Joi.number().integer(1).required()
  })
};

/**
 *
 * @param {Array} savedVariants
 * @param {Array} variants
 * @param {String} shopId
 * @return {Array} array of variant meta_data
 */
const extractMetaDataAndSku = (savedVariants, variants, shopId) => {
  const result = {
    meta: [],
    sku: []
  };
  variants.forEach((v, index) => v.meta.forEach((m) => {
    m.variantId = savedVariants[index].id;
    const sku = {
      sku: v.sku,
      shopId,
      variantId: savedVariants[index].id
    };
    result.meta.push(m);
    result.sku.push(sku);
  }));
  return result;
};

/**
 *
 * @param {object} req
 * @param {object} res
 * @return {object} response object
 */
async function handler(req, res) {
  const transaction = await sequelize.transaction();
  const { variants, shopId } = req.body;
  try {
    // save product variant
    const savedVariants = await ProductVariant
      .bulkCreate(variants, { transaction, returning: true });
    // extract product meta ans sku from req
    const { meta, sku } = extractMetaDataAndSku(savedVariants, variants, shopId);
    // save sku
    await ProductSku.bulkCreate(sku, { transaction, validate: true });
    // save meta data
    await productVariantMeta.bulkCreate(meta, { transaction, validate: true });
    await transaction.commit();
    res.status(201).send({ message: 'variants created' });
  } catch (e) {
    await transaction.rollback();
    throw (e);
  }
}

module.exports = [
  validator(validate),
  wrap(handler)
];
