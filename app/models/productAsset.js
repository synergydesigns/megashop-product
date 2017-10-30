module.exports = (sequelize, DataTypes) => {
  const productAsset = sequelize.define('ProductAsset', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        }
      }
    },
    url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: 'This can only contain url'
        }
      }
    },
    priority: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        }
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: 'Please, enter a valid product id'
        }
      }
    }
  }, {
    tableName: 'product_asset',
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
