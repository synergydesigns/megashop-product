module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('advanceProductPrices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL
      },
      date_from: {
        type: Sequelize.DATE
      },
      date_to: {
        type: Sequelize.DATE
      },
      advance_product_pricecol: {
        type: Sequelize.DECIMAL
      },
      advance_product_pricecol1: {
        type: Sequelize.DECIMAL
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
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
  down: queryInterface => queryInterface.dropTable('advanceProductPrices')
};
