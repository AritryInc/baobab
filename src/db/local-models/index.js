const path = require('path');
const Sequelize = require('sequelize');
const createConnection = require('../../utils/connection');
const models = require('../models');
const { migrateDB, syncDB } = require('../databases');
const config = require('../../config/database');

const basename = path.basename(__filename);
const databases = new Map();

exports.createAndSyncDB = async (dbName) => {
  await models.sequelize.query(`CREATE DATABASE ${dbName};`);

  const sequelize = new Sequelize(createConnection(dbName), config.options);

  await migrateDB(sequelize, dbName);

  const db = syncDB(sequelize, __dirname, basename);

  databases.set(dbName, db);

  return db;
};

exports.getDB = async (dbName) => {
  let db = databases.get(dbName);

  if (!db) {
    const sequelize = new Sequelize(createConnection(dbName), config.options);

    await migrateDB(sequelize, dbName);

    db = syncDB(sequelize, __dirname, basename);

    databases.set(dbName, db);
  }

  return db;
};

exports.databases = databases;
