module.exports = (sequelize, DataTypes) => {
  const UserPod = sequelize.define('UserPod', {
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
    podId: {
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

  UserPod.associate = (models) => {
    UserPod.belongsTo(models.User, {
      foreignKey: 'userId',
    });

    UserPod.belongsTo(models.Pod, {
      foreignKey: 'podId',
    });
  };
  return UserPod;
};
