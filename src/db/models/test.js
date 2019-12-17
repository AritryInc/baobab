module.exports = (sequelize, DataTypes) => {
  const test = sequelize.define('test', {
    email: DataTypes.STRING,
  }, {});
  // test.associate = (models) => {
  //   // associations can be defined here
  // };
  return test;
};
