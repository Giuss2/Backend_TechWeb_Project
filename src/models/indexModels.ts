import { Sequelize } from "sequelize";
import { createUserModel } from "./User.js";
import { createCatModel } from "./Cat.js";
import { createCommentModel } from "./Comment.js";


const sequelize = new Sequelize({
  dialect: "sqlite", 
  storage: "database.sqlite" 
});

declare module "express-serve-static-core" {
  interface Request {
    username?: string;
  }
}

const User = createUserModel(sequelize);
const Cat = createCatModel(sequelize);
const Comment = createCommentModel(sequelize);

//Associations
User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Comment.belongsTo(User, {
  foreignKey: 'userId'
});

Cat.hasMany(Comment, {
  foreignKey: 'catId',
  onDelete: 'CASCADE'
});
Comment.belongsTo(Cat, {
  foreignKey: 'catId'
});

User.hasMany(Cat, {
  foreignKey: 'userName'
});

Cat.belongsTo(User, {
  foreignKey: 'userName'
});



export { sequelize, User, Cat, Comment };
