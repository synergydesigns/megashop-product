module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('product_variant_meta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      variantId: {
        type: Sequelize.INTEGER,
        field: 'variant_id',
        references: {
          model: 'product_variant',
          key: 'id'
        }
      },
      key: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      },
      variant_asset: {
        type: Sequelize.STRING,
        field: 'variant_asset'
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
