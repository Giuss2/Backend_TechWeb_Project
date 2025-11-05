import { Sequelize, DataTypes } from "sequelize";

export function createCommentModel(database: Sequelize){
    const Comment= database.define('Comment', {
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
        },
        CatPageID: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Cat',
                key: 'CatID'
            }
        }
    })
    return Comment;
}
