const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];

module.exports = (organizationName = process.env.DATABASE_NAME) => `${process.env[config.use_env_variable]}${organizationName}`;
