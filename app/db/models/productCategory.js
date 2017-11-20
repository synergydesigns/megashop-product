module.exports = (sequelize, DataTypes) => {
  const productCategory = sequelize.define('productCategory', {
    name: {
      types: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        }
      }
    },
    description: {
      types: DataTypes.TEXT
    },
    shopId: {
      types: DataTypes.INTEGER,
      allowNull: false,
      field: 'shop_id'
    },
    parentCategoryId: {
      types: DataTypes.INTEGER,
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
