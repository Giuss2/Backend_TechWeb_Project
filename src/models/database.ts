import { Sequelize, type Dialect } from 'sequelize';
import {createUserModel} from "./User.js"
import 'dotenv/config.js';


export const database = new Sequelize(process.env.DB_CONNECTION_URI!, {
  dialect: process.env.DIALECT! as Dialect
});


createUserModel(database);

export const {User}= database.models;

try {
  await database.sync();
  console.log("Database synced");
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error(err); // generic fallback
  }
}


