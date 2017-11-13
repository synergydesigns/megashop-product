const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const productPromo = sequelize.define('ProductPromo', {
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /\w+/g,
          msg: 'Please, enter a valid brand name'
        }
      }
    },
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
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      field: 'start_date',
      validate: {
        isDate: {
          args: true,
          msg: 'Please, enter a valid date'
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'end_date',
      validate: {
        isDate: {
          args: true,
          msg: 'Please, enter a valid date'
        },
        isAfterNow(date, next) {
          if (moment(date).isSameOrAfter(this.startDate)) {
            next();
          } else {
            return next(new Error('endDate should after start date'));
          }
        }
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'product_id',
      validate: {
        isInt: {
          args: true,
          msg: 'Please, enter a valid product id'
        }
      }
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'shop_id',
      validate: {
        isInt: {
          args: true,
          msg: 'Please, enter a valid product id'
        }
      }
    }
  }, {
    tableName: 'product_promo',
    classMethods: {
      associate: (models) => {
        productPromo.belongsTo(
          models.product,
          { foreignKey: 'product_id' }
        );
      }
    }
  });
  return productPromo;
};
