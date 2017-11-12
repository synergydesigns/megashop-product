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
    key: {
      type: DataTypes.STRING,
      field: 'meta_key',
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        }
      }
    },
    value: {
      type: DataTypes.STRING,
      field: 'meta_value',
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
