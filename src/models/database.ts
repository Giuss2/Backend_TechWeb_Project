import { Sequelize } from "sequelize";
import { createUserModel } from "./User.js";
import { createCatModel } from "./Cat.js";
import { createCommentModel } from "./Comment.js";

const database = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
  logging: false
});

database.authenticate()
  .then(() => database.query("PRAGMA foreign_keys = ON;"))
  .catch(console.error);

console.log("DB PATH:", process.cwd());

const User = createUserModel(database);
const Cat = createCatModel(database);
const Comment = createCommentModel(database);

// assotiations
User.hasMany(Cat, { foreignKey: 'userId', onDelete: 'CASCADE' });
Cat.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Cat.hasMany(Comment, { foreignKey: 'catId', onDelete: 'CASCADE' });
Comment.belongsTo(Cat, { foreignKey: 'catId' });

// sync database

database.sync({ force: false })
  .then(() => console.log("Database synced"))
  .catch(err => console.error("Error syncing database:", err.message));

export { database, User, Cat, Comment };
