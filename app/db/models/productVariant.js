module.exports = (sequelize, DataTypes) => {
  const ProductVariant = sequelize.define('ProductVariant', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    weight: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id',
      references: {
        model: 'product',
        key: 'id'
      }
    }
  }, {
    tableName: 'product_variant',
    classMethods: {
      associate: (models) => {
        ProductVariant.belongsTo(
          models.product,
          { foreignKey: 'product_id' }
        );
      }
    }
  });
  return ProductVariant;
};
