import { createConnection } from '../utils/connection';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.js')[env];

const modelNames = ['pod', 'localUser', 'task', 'localOrganization'];
const db = {};



export const syncDb = (dbName) => {

  const sequelize = new Sequelize(createConnection(dbName));

  fs.readdirSync(`${__dirname}'/models/local`)
    .forEach(file => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  sequelize.sync();
}

const addDatabase = async (orgId) => {

}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
