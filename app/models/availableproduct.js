module.exports = (sequelize, DataTypes) => {
  const availableProduct = sequelize.define('availableProduct', {
    release_date: {
      type: DataTypes.DATE
    },
    message: {
      type: DataTypes.TEXT
    },
    product_id: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: (models) => {
        availableProduct.belongsTo(
          models.product,
          { foreignKey: 'product_id' }
        );
      }
    }
  });
  return availableProduct;
};
