module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    podId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('UNSTARTED', 'PROGRESS', 'FINISHED'),
      allowNull: false,
      defaultValue: 'UNSTARTED',
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

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'owner',
    });

    Task.belongsTo(models.User, {
      foreignKey: 'assignedTo',
      as: 'assignee',
    });

    Task.belongsTo(models.Pod, {
      foreignKey: 'podId',
      as: 'pod',
    });

    Task.belongsToMany(models.User, {
      foreignKey: 'taskId',
      as: 'assignees',
      through: 'UserTasks',
    });
  };
  return Task;
};
