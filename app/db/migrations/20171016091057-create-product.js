module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('products', {
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
        type: Sequelize.INTEGER
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
      sku: {
        type: Sequelize.STRING
      },
      productcol: {
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
      brands_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'brands',
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
  down: queryInterface => queryInterface.dropTable('products')
};
