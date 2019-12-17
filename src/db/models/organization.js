module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Organization.associate = (models) => {
    Organization.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'owner',
      onDelete: 'CASCADE',
    });
  };
  return Organization;
};
