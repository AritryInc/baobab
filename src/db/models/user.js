module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User',
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Organization, {
      foreignKey: 'createdBy',
      as: 'organizations',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
