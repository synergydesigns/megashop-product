module.exports = (sequelize, DataTypes) => {
  const brand = sequelize.define('Brand', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /\w+/g,
          msg: 'Please, enter a valid brand name'
        },
        isUnique(name, next) {
          brand.findOne({
            where: {
              shopId: this.shopId,
              name
            }
          }).then((prod) => {
            if (prod) {
              return next(new Error(`brand with name ${this.name} already exist`));
            }
            next();
          });
        }
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'shop_id',
      validate: {
        isInt: {
          args: true,
          msg: 'Please, enter a valid shop id'
        }
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        brand.hasMany(
          models.product,
          { foreignKey: 'brand_id' }
        );
        // associations can be defined here
      }
    }
  });
  return brand;
};
