module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('product_asset', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.STRING
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'product',
          key: 'id'
        }
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
  down: queryInterface => queryInterface.dropTable('productAssets')
};
