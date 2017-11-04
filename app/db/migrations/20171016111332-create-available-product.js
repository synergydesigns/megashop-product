module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('available_product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      release_date: {
        type: Sequelize.DATE
      },
      message: {
        type: Sequelize.TEXT
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
  down: queryInterface => queryInterface.dropTable('availableProducts')
};
