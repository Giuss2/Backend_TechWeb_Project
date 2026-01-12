import { DataTypes, Sequelize } from "sequelize";

export function createCatModel(database: Sequelize){
    const Cat= database.define('Cat', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        titolo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descrizione: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        foto: {
            type: DataTypes.STRING, //da RIVEVERE
            allowNull: false,
            defaultValue: 'gatto_default.jpg'
        },
        lat: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        lng: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        dataInserimento: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    }, {
        tableName: 'Cats'
    })
    return Cat;
}