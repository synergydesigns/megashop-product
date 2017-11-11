module.exports = (sequelize, DataTypes) => {
  const productVariantMeta = sequelize.define('productVariantMeta', {
    variantId: {
      type: DataTypes.INTEGER,
      field: 'variant_id',
      validate: {
        isInt: {
          args: true,
          msg: 'Please, enter a valid product id'
        }
      }
    },
    key: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        }
      }
    },
    value: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        }
      }
    }
  }, {
    tableName: 'product_variant_meta',
    classMethods: {
      associate: (models) => {
        productVariantMeta.belongsTo(
          models.product,
          { foreignKey: 'product_id' }
        );
      }
    }
  });
  return productVariantMeta;
};
