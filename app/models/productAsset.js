module.exports = (sequelize, DataTypes) => {
  const productAsset = sequelize.define('productAsset', {
    type: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.STRING,
    },
    product_id: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: (models) => {
        productAsset.belongsTo(
          models.product,
          { foreignKey: 'product_id' }
        );
      }
    }
  });
  return productAsset;
};
