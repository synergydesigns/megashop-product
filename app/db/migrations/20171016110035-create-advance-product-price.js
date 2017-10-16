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
        type: Sequelize.FLOAT
      },
      date_from: {
        type: Sequelize.DATE
      },
      date_to: {
        type: Sequelize.DATE
      },
      advance_product_pricecol: {
        type: Sequelize.STRING
      },
      advance_product_pricecol1: {
        type: Sequelize.STRING
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
