'use strict';
module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    name: DataTypes.STRING,
    created_by: DataTypes.INTEGER
  }, {});
  Organization.associate = function(models) {
    // associations can be defined here
    Organization.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'owner',
      onDelete: 'CASCADE'
    })
  };
  return Organization;
};