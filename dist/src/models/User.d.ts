import { Sequelize, Model, type Optional } from "sequelize";
export interface UserAttributes {
    userName: string;
    password: string;
    id: number;
}
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
}
export declare function createUserModel(database: Sequelize): import("sequelize").ModelCtor<Model<UserCreationAttributes, UserCreationAttributes>>;
//# sourceMappingURL=User.d.ts.map