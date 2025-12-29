import { Sequelize } from "sequelize";
import { createUserModel } from "./User.js";
import { createCatModel } from "./Cat.js";
import { createCommentModel } from "./Comment.js";
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite"
});
const User = createUserModel(sequelize);
const Cat = createCatModel(sequelize);
const Comment = createCommentModel(sequelize);
User.hasMany(Comment, {
    foreignKey: 'userID',
    onDelete: 'CASCADE'
});
Comment.belongsTo(User, {
    foreignKey: 'userID'
});
Cat.hasMany(Comment, {
    foreignKey: 'catID',
    onDelete: 'CASCADE'
});
Comment.belongsTo(Cat, {
    foreignKey: 'catID'
});
User.hasMany(Cat, {
    foreignKey: 'userID',
    onDelete: 'CASCADE'
});
Cat.belongsTo(User, {
    foreignKey: 'userID'
});
export { sequelize, User, Cat, Comment };
//# sourceMappingURL=indexModels.js.map