module.exports = (sequelize, DataTypes) => {
  const UserTasks = sequelize.define('UserTask', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taskId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {});

  UserTasks.associate = (models) => {
    UserTasks.belongsTo(models.User, {
      foreignKey: 'userId',
    });

    UserTasks.belongsTo(models.Task, {
      foreignKey: 'taskId',
    });
  };

  return UserTasks;
};
