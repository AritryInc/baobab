module.exports = (sequelize, DataTypes) => {
  const Pod = sequelize.define('Pod', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      unique: false,
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

  Pod.associate = (models) => {
    Pod.hasMany(models.Task, {
      foreignKey: 'podId',
      as: 'pod',
    });

    Pod.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'owner',
    });

    Pod.belongsToMany(models.User, {
      foreignKey: 'podId',
      as: 'members',
      through: 'UserPod',
    });
  };
  return Pod;
};
