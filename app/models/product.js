module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /\w+/g,
          msg: 'Enter a valid name'
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
    categoryId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: [],
      field: 'category_id'
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: {
          args: true,
          msg: 'Please, enter a valid product\'s quantity'
        }
      }
    },
    amount: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: {
          args: true,
          msg: 'Please, enter a valid price'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: {
          args: /\w+/g,
          msg: 'Enter a valid product\'s description'
        }
      }
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        isIn: {
          args: [[true, false]],
          msg: 'This field requires true or false value'
        }
      }
    },
    hot: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        isIn: {
          args: [[true, false]],
          msg: 'This field requires true or false value'
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        }
      }
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        }
      }
    },
    productcol: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        },
        isDecimal: {
          msg: 'Enter a valid product weight'
        }
      }
    },
    height: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: {
          msg: 'Enter a valid product height'
        }
      }
    },
    depth: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: {
          msg: 'Enter a valid product depth'
        }
      }
    },
    visible: {
      type: DataTypes.BOOLEAN,
      validate: {
        isIn: {
          args: [[true, false]],
          msg: 'This field requires true or false value'
        }
      }
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
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: 'Please, enter a valid brand id'
        }
      },
      field: 'brand_id'
    }
  }, {
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
