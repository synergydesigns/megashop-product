module.exports = (sequelize, DataTypes) => {
  const productCategory = sequelize.define('productCategory', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        }
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: 'Please, enter a valid shop id'
        }
      },
      field: 'shop_id'
    },
    parentCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
          args: true,
          msg: 'Please, enter a valid product category id'
        }
      },
      field: 'parent_category_id'
    }
  }, {
    tableName: 'product_category',
    classMethods: {
      associate: (models) => {
        productCategory.hasMany(
          models.product,
          { foreignKey: 'category_id' }
        );
      }
    }
  });
  return productCategory;
};
