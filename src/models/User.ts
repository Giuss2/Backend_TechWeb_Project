import { Sequelize, DataTypes, Model, type ModelDefined } from "sequelize";
import { createHash } from "crypto";


export interface UserAttributes {
  userName: string;
  password: string;
}

export function createModel(sequelize: Sequelize) {
  sequelize.define<Model<UserAttributes>>('User', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
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
}

