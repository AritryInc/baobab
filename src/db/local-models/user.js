module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
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

  User.associate = (models) => {
    User.belongsToMany(models.Pod, {
      foreignKey: 'userId',
      as: 'pods',
      through: 'UserPod',
    });

    User.belongsToMany(models.Task, {
      foreignKey: 'userId',
      as: 'tasks',
      through: 'UserTasks',
    });
  };
  return User;
};
