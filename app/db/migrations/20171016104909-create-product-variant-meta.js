module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('product_variant_meta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_variant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'product_variant',
          key: 'id'
        }
      },
      meta_key: {
        type: Sequelize.STRING
      },
      meta_value: {
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
  down: queryInterface => queryInterface.dropTable('product_variant_meta')
};
