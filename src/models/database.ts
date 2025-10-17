import { Sequelize, type Dialect } from 'sequelize';
import {createUserModel} from "./User.js"
import 'dotenv/config.js';


export const database = new Sequelize(process.env.DB_CONNECTION_URI!, {
  dialect: process.env.DIALECT! as Dialect
});
//const sqlite3 = require('sqlite3').verbose();

createUserModel(database);

export const {User}= database.models;

database.sync().then( () => {
  console.log("Database synced correctly");
}).catch( err => {
  console.error("Error with database synchronization: " + err.message);
});
