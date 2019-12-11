'use strict';
module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    organizationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {});
  Organization.associate = function(models) {
    // associations can be defined here
    Organization.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'owner',
      onDelete: 'CASCADE'
    })
  };
  return Organization;
};