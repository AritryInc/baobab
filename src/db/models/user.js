'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', 
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Organization, {
      foreignKey: 'createdBy',
      as: 'organizations',
      onDelete: 'CASCADE'
    })
  };
  return User;
};