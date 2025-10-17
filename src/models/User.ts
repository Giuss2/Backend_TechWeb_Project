import { Sequelize, DataTypes, Model } from "sequelize";
import { createHash } from "crypto";

export interface UserAttributes {
  userName: string;
  password: string;
  id: number;
}

export function createUserModel(database: Sequelize) {
  const User= database.define<Model<UserAttributes>>('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) { 
        let hash = createHash("sha256"); 
        (this as unknown as Model).setDataValue('password', hash.update(value).digest("hex"));
      }
    }
  }, {
  });

  return User;
}

