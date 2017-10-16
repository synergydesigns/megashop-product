module.exports = (sequelize, DataTypes) => {
  const productMeta = sequelize.define('productMeta', {
    product_id: {
      type: DataTypes.INTEGER,
    },
    meta_key: {
      type: DataTypes.STRING
    },
    meta_value: {
      type: DataTypes.STRING
    },
    meta_type: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        productMeta.belongsTo(
          models.product,
          { foreignKey: 'product_id' }
        );
      }
    }
  });
  return productMeta;
};
