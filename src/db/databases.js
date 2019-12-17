const fs = require('fs');
const path = require('path');
const Umzug = require('umzug');

const databases = new Map();

exports.migrateDB = async (instance, dbName, isMain = false) => {
  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize: instance,
    },
    migrations: {
      params: [
        instance.getQueryInterface(), // queryInterface
        instance.constructor,
      ],
      path: `${__dirname}${isMain ? '/migrations' : '/local-migrations'}`,
    },
  });

  console.log('\x1b[33m%s\x1b[0m', `=========Migrating ${dbName}===========`);

  const migrations = await umzug.up();

  console.log('\x1b[32m%s\x1b[0m', `==========Migrated ${dbName}===========\n`);

  return migrations;
};

exports.syncDB = (sequelize, dir, basename) => {
  const db = {};

  fs.readdirSync(dir)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
      const model = sequelize.import(path.join(dir, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;

  return db;
};

exports.databases = databases;
