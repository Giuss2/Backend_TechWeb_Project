import { Sequelize, DataTypes } from "sequelize";
console.log("Loading Comment model file...");

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
        catId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Cats',
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    })
    return Comment;
}
