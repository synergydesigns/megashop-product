module.exports = (sequelize, DataTypes) => {
  const productMeta = sequelize.define('ProductMeta', {
    product_id: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: 'Please, enter a valid product id'
        }
      }
    },
    meta_key: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        }
      }
    },
    meta_value: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        }
      }
    },
    meta_type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        }
      }
    }
  }, {
    tableName: 'product_meta',
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
