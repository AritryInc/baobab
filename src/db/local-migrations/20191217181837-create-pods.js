module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Pods', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
    },
    createdBy: {
      type: Sequelize.STRING,
      unique: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Pods'),
};
