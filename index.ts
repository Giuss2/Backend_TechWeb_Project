import express, { Request, Response, NextFunction } from "express";
import authRouter from './src/routes/authRouter';
import {sequelize} from "./src/models/indexModels";

const app= express();
const PORT= 3000;


app.use(express.json());
const router = express.Router();
app.use('/auth', authRouter);

app.get('/', (req: Request, res: Response)=>{
  res.send('Hello World!')
});

//middleware for login

//error handler
app.use( (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack);
  res.status(err.status || 500).json({
    code: err.status || 500,
    description: err.message || "An error occurred"
  });
});


app.listen(PORT, async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("Error sync:", err);
  }
});


