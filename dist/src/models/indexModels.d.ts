import { Sequelize } from "sequelize";
declare const sequelize: Sequelize;
declare module "express-serve-static-core" {
    interface Request {
        username?: string;
    }
}
declare const User: import("sequelize").ModelCtor<import("sequelize").Model<import("./User.js").UserCreationAttributes, import("./User.js").UserCreationAttributes>>;
declare const Cat: import("sequelize").ModelCtor<import("sequelize").Model<any, any>>;
declare const Comment: import("sequelize").ModelCtor<import("sequelize").Model<any, any>>;
export { sequelize, User, Cat, Comment };
//# sourceMappingURL=indexModels.d.ts.map