module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('product_categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      shop_id: {
        type: Sequelize.INTEGER
      },
      parent_category_id: {
        type: Sequelize.INTEGERs
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
  down: queryInterface => queryInterface.dropTable('product_categories')
};
