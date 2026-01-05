import { Sequelize, DataTypes, Model, type Optional } from "sequelize";
import { createHash } from "crypto";

export interface UserAttributes {  //controlla che non l'hai usata in altri file (ho eliminato export)
  userName: string;
  email: string;
  password: string;
  id: number;
}
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export function createUserModel(database: Sequelize) {
  const User= database.define<Model<UserAttributes, UserCreationAttributes>>('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) { 
        console.log(value);
        if (!value) throw new Error("Password is required");
        const hash = createHash("sha256"); 
        this.setDataValue('password', hash.update(value).digest("hex"));
      }

    }
  })
  return User;
}

