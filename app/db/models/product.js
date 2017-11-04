module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
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
    categoryId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'category_id',
      set(val) {
        val = val || [];
        this.setDataValue('categoryId', val.join(', '));
      },
      get() {
        const val = this.getDataValue('categoryId');
        if (val) {
          return val.split(',').map(key => parseInt(key, 10));
        }
        return [];
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    },
    description: {
      type: DataTypes.TEXT
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    hot: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    type: {
      type: DataTypes.STRING,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        },
        isUnique(sku, next) {
          product.findOne({
            where: {
              shopId: this.shopId,
              sku
            }
          }).then((prod) => {
            if (prod) {
              return next(new Error('product with this sku already exist'));
            }
            next();
          });
        }

      }
    },
    weight: {
      type: DataTypes.DECIMAL,
    },
    height: {
      type: DataTypes.DECIMAL,
    },
    depth: {
      type: DataTypes.DECIMAL,
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    downloadable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'shop_id'
    },
    brandId: {
      type: DataTypes.INTEGER,
      field: 'brand_id'
    }
  }, {
    tableName: 'product',
    classMethods: {
      associate: (models) => {
        product.belongsTo(
          models.product,
          { foreignKey: 'brand_id' }
        );
        product.hasMany(
          models.advanceProductPrice,
          { foreignKey: 'product_id' }
        );
        product.hasMany(
          models.availableProduct,
          { foreignKey: 'product_id' }
        );
        product.hasMany(
          models.productAsset,
          { foreignKey: 'product_id' }
        );
        product.hasMany(
          models.productMeta,
          { foreignKey: 'product_id' }
        );
      }
    }
  });
  return product;
};
