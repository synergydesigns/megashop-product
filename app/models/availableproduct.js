module.exports = (sequelize, DataTypes) => {
  const availableProduct = sequelize.define('availableProduct', {
    release_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: 'Please, enter a valid date'
        }
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: {
          args: /\w+/g,
          msg: 'Enter a valid message'
        }
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: 'Please, enter a valid product id'
        }
      }
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
