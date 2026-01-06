import { DataTypes, Sequelize } from "sequelize";
console.log("Loading Cat model file...");


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
            allowNull: false
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
            type: DataTypes.STRING,
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