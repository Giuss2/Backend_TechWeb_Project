import { Sequelize } from "sequelize";
import { createUserModel } from "./User.js";
import { createCatModel } from "./Cat.js";
import { createCommentModel } from "./Comment.js";

// indexModels.ts
console.log("Before creating sequelize instance");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
  logging: false
});
console.log("Sequelize instance created");

export const User = createUserModel(sequelize);
console.log("User model created");

export const Cat = createCatModel(sequelize);
console.log("Cat model created");

export const Comment = createCommentModel(sequelize);
console.log("Comment model created");

// associazioni
User.hasMany(Cat, { foreignKey: 'userId', onDelete: 'CASCADE' });
Cat.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Cat.hasMany(Comment, { foreignKey: 'catId', onDelete: 'CASCADE' });
Comment.belongsTo(Cat, { foreignKey: 'catId' });

console.log("Associations done");

export { sequelize };
