import Joi from 'joi';
import validator from 'express-validation';

import Model from '../../db/models/index';
import wrap from '../../lib/asyncWrapper';

const {
  Product,
  productVariantMeta,
  ProductVariant,
  ProductSku,
  sequelize
} = Model;


const validate = {
  body: Joi.object().keys({
    variant: Joi.array().items(Joi.object().keys({
      name: Joi.string().required(),
      skuId: Joi.number().integer(),
      productAssetId: Joi.number().integer().required(),
      weight: Joi.number().integer(),
      quantity: Joi.number().integer().default(0),
      price: Joi.number().integer().default(0),
      productId: Joi.number().integer(1).required(),
      meta: Joi.array().items(Joi.object().keys({
        key: Joi.string().required(),
        value: Joi.string().required()
      }))
    })).required(),
    productId: Joi.number().integer(1).required(),
    shopId: Joi.number().integer(1).required()
  })
};
const productVariant = [
  ...[
    'test-red-m',
    'test-red',
    'test-gree'
  ].map((v, index) => ({
    productId: 1,
    name: `${index} ${v}`,
    sku: require('faker').random.uuid(),
    variant_asset: require('faker').image.fashion(),
    weight: 40,
    price: 40,
    product_id: 3,
    meta: [
      {
        key: 'color',
        value: 'red'
      },
      {
        key: 'size',
        value: 'M'
      }
    ]
  }))
];

/**
 *
 * @param {Array} savedVariants
 * @param {Array} variants
 * @param {String} shopId
 * @return {Array} array of variant meta_data
 */
const extractMetaDataAndSku = (savedVariants, variants, shopId) => {
  const meta = [];
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
  try {
    const savedVariants = await ProductVariant
      .bulkCreate(productVariant, { transaction, returning: true });
    const { meta, sku } = extractMetaDataAndSku(savedVariants, productVariant, 6);
    await ProductSku.bulkCreate(sku, { transaction, validate: true });
    await productVariantMeta.bulkCreate(meta, { transaction, validate: true });
    await transaction.commit();
    res.send({ message: 'variants created' });
  } catch (e) {
    await transaction.rollback();
    throw (e);
  }
}

module.exports = [
  // validator(validate),
  wrap(handler)
];
