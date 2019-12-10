'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Organization, {
      foreignKey: 'userId',
      as: 'organizations',
      onDelete: 'CASCADE'
    })
  };
  return User;
};