
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('product_sku', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER,
      },
      shop_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      variant_id: {
        type: Sequelize.INTEGER,
      },
      sku: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable('product_sku')
};
