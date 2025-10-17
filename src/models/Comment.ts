import { Sequelize, DataTypes } from "sequelize";
import { database } from "./database.js";

export function createModel(database){
    database.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        testo: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        dataCommento: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    })
}
