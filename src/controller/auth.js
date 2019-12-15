import models, { Sequelize } from '../db/models';
import { createConnection } from '../utils/connection';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { User, Organization } = models;
let spawnedInstance;
const SignUp = async (req, res) => {
  const { email, organizationName } = req.body;
  try {
    const user = await User.create({ email })
    const createdBy = await user.id;
    const organization = await Organization.create({ organizationName, createdBy })
    
    if (organization) {
      const client = new Client({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      });
      client.connect(err => {
        if (err) {'connection error', err.stack }
        else { console.log('connected') };
      })
      client.query(
        `CREATE DATABASE ${organization.organizationName}`, (err, res) => {
          if (err) throw err
          client.end()
        })
      const connectionURI = createConnection(organization.organizationName);
      spawnedInstance = new Sequelize(connectionURI);
      console.log(spawnedInstance);
    }
    res.json({
      status: 201,
      user,
      organization,
      message: 'User created successfully'
    })
  } catch (err) {
    return res.json({
      status: 500,
      err
    })
  }

}

export default SignUp;
