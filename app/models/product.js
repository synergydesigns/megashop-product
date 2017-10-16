module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT
    },
    category_id: {
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    amount: {
      type: DataTypes.FLOAT
    },
    description: {
      type: DataTypes.TEXT
    },
    available: {
      type: DataTypes.BOOLEAN
    },
    hot: {
      type: DataTypes.BOOLEAN
    },
    type: {
      type: DataTypes.STRING
    },
    sku: {
      type: DataTypes.STRING
    },
    productcol: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.FLOAT
    },
    height: {
      type: DataTypes.FLOAT
    },
    depth: {
      type: DataTypes.FLOAT
    },
    visible: {
      type: DataTypes.BOOLEAN
    },
    shop_id: {
      type: DataTypes.INTEGER
    },
    brands_id: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: (models) => {
        product.belongsTo(
          models.product,
          { foreignKey: 'brands_id' }
        );
      }
    }
  });
  return product;
};
