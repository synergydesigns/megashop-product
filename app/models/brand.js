module.exports = (sequelize, DataTypes) => {
  const brand = sequelize.define('brand', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /\w+/g,
          msg: 'Please, enter a valid brand name'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        is: {
          args: /\w+/g,
          msg: 'Enter a valid description'
        }
      }
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
