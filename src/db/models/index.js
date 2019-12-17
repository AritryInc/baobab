const path = require('path');
const Sequelize = require('sequelize');
const createConnection = require('../../utils/connection');
const config = require('../../config/database');
const { syncDB } = require('../databases');

const basename = path.basename(__filename);

const sequelize = new Sequelize(createConnection(), config.options);

const db = syncDB(sequelize, __dirname, basename);

module.exports = db;
