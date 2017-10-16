module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('productMeta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id'
        }
      },
      meta_key: {
        type: Sequelize.STRING
      },
      meta_value: {
        type: Sequelize.STRING
      },
      meta_type: {
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
  down: queryInterface => queryInterface.dropTable('productMeta')
};
