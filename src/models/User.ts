import { Sequelize, DataTypes, Model, type Optional } from "sequelize";
import { createHash } from "crypto";

export interface UserAttributes {  //controlla che non l'hai usata in altri file (ho eliminato export)
  userName: string;
  password: string;
  id: number;
}
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export function createUserModel(database: Sequelize) {
  const User= database.define<Model<UserCreationAttributes>>('User', {
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
  })
  return User;
}

