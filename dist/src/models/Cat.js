import { DataTypes, Sequelize } from "sequelize";
export function createCatModel(database) {
    const Cat = database.define('Cat', {
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
            type: DataTypes.STRING,
            allowNull: false
        },
        posizioneGeografica: {
            type: DataTypes.GEOGRAPHY('POINT', 4326),
            allowNull: false
        },
        dataInserimento: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        userID: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'userName'
            }
        }
    });
    return Cat;
}
//# sourceMappingURL=Cat.js.map