module.exports = (sequelize, DataTypes) => {
  const advanceProductPrice = sequelize.define('advanceProductPrice', {
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: {
          args: true,
          msg: 'Please, enter a valid price'
        }
      }
    },
    date_from: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      validate: {
        isDate: {
          args: true,
          msg: 'Please, enter a valid date'
        }
      }
    },
    date_to: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: 'Please, enter a valid date'
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
        advanceProductPrice.belongsTo(
          models.product,
          { foreignKey: 'product_id' }
        );
      }
    }
  });
  return advanceProductPrice;
};
