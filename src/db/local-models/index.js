const path = require('path');
const Sequelize = require('sequelize');
const createConnection = require('../../utils/connection');
const models = require('../models');
const { migrateDB, syncDB } = require('../databases');
const config = require('../../config/database');

const basename = path.basename(__filename);

exports.createDB = async (dbName) => {
  await models.sequelize.query(`CREATE DATABASE ${dbName};`);

  const sequelize = new Sequelize(createConnection(dbName), config.options);

  return migrateDB(sequelize, dbName);
};

exports.getDB = ((dbs) => async (dbName) => {
  let db = dbs.get(dbName);

  if (!db) {
    const sequelize = new Sequelize(createConnection(dbName), config.options);

    await migrateDB(sequelize, dbName);

    db = syncDB(sequelize, __dirname, basename);

    dbs.set(dbName, db);
  }

  return db;
})(new Map());
