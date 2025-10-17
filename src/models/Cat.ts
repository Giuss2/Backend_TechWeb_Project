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
            allowNull: false
        },
        posizioneGeografica: {
            type: DataTypes.GEOGRAPHY('POINT', 4326), // Memo: Leaflet inverte le coordinate
            allowNull: false
        },
        dataInserimento: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
        
    })
    return Cat;
}