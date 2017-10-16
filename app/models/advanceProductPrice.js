module.exports = (sequelize, DataTypes) => {
  const advanceProductPrice = sequelize.define('advanceProductPrice', {
    price: {
      type: DataTypes.INTEGER,
    },
    date_from: {
      type: DataTypes.DATE
    },
    date_to: {
      type: DataTypes.DATE
    },
    advance_product_pricecol: {
      type: DataTypes.STRING
    },
    advance_product_pricecol1: {
      type: DataTypes.STRING
    },
    product_id: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: (models) => {
        advanceProductPrice.belongsTo(
          models.product,
          { foreignKey: 'product_id' }
        );
      }
    }
  });
  return advanceProductPrice;
};
