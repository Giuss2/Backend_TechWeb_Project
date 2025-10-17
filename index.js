import { Sequelize } from "sequelize";
import express from "express"
import authRouter from './src/routes/authRouter';
import {defineUserModel, User} from './src/models/User';

const app= express();
const PORT= 3000;

const sequilize = new Sequelize();

defineUserModel(sequilize);

//associations
User.hasMany(database.models.Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
database.models.Comment.belongsTo(User, {
  foreignKey: 'userId'
});


database.models.Cat.hasMany(database.models.Comment, {
  foreignKey: 'catId',
  onDelete: 'CASCADE'
});
database.models.Comment.belongsTo(database.models.Cat, {
  foreignKey: 'catId'
});


app.use(express.json());
const router = express.Router();
app.use('/auth', authRouter);

app.get('/', (req, res)=>{
  res.send('Hello World!')
});

//middleware for login

//error handler
app.use( (err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status || 500).json({
    code: err.status || 500,
    description: err.message || "An error occurred"
  });
});


app.listen(PORT);


export {user, sequilize};
