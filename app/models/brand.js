module.exports = (sequelize, DataTypes) => {
  const brand = sequelize.define('brand', {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT
    },
    shop_id: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return brand;
};
