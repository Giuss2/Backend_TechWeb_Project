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
        catID: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Cat',
                key: 'catID'
            }
        },
        userID: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'userName'
            }
        }
    })
    return Comment;
}
