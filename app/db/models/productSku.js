module.exports = (sequelize, DataTypes) => {
  const ProductSku = sequelize.define('ProductSku', {
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        },
        isUnique(sku, next) {
          ProductSku.findOne({
            where: {
              shopId: this.shopId,
              sku
            }
          }).then((prod) => {
            if (prod) {
              return next(new Error('product with this sku already exist'));
            }
            next();
          });
        }
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id'
    },
    variantId: {
      type: DataTypes.INTEGER,
      field: 'variant_id'
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'shop_id'
    }
  }, {
    tableName: 'product_sku',
    classMethods: {
      associate: (models) => {
        ProductSku.belongsTo(
          models.product,
          { foreignKey: 'product_id' }
        );
      }
    }
  });
  return ProductSku;
};
