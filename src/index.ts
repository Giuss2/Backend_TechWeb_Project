import express, { type Request, type Response, type NextFunction } from "express";
import authRouter from './routes/authRouter.js';
import cors from "cors";
import { userRouter } from "./routes/userRouter.js";
import { catRouter } from "./routes/catRouter.js";
import { commentRouter } from "./routes/commentRouter.js";
import dotenv from "dotenv";

dotenv.config();

  const app = express();
  const PORT = 3000;
  console.log(process.env.TOKEN_SECRET);

  app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
  }));
  app.use(express.json());

  // Error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    res.status(err.status || 500).json({
      code: err.status || 500,
      description: err.message || "An error occurred"
    });
  });

  //routes
  app.use('/auth', authRouter);
  app.use('/users', userRouter);
  app.use('/cats', catRouter);
  app.use('/comments', commentRouter);

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
