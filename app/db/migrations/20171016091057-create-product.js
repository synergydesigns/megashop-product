module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      category_id: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.DECIMAL
      },
      amount: {
        type: Sequelize.DECIMAL
      },
      description: {
        type: Sequelize.TEXT
      },
      available: {
        type: Sequelize.BOOLEAN
      },
      hot: {
        type: Sequelize.BOOLEAN
      },
      type: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.DECIMAL
      },
      height: {
        type: Sequelize.DECIMAL
      },
      depth: {
        type: Sequelize.DECIMAL
      },
      visible: {
        type: Sequelize.BOOLEAN
      },
      shop_id: {
        type: Sequelize.INTEGER
      },
      downloadable: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      brand_id: {
        type: Sequelize.INTEGER
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
  down: queryInterface => queryInterface.dropTable('product')
};
