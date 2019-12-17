require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_DEV_SERVER',
  },
  test: {
    use_env_variable: 'DATABASE_TEST_SERVER',
  },
  production: {
    use_env_variable: 'DATABASE_SERVER',
  },

  options: {
    logging: false,
  },
};
