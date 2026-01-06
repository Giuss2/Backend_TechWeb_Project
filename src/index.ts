import express, { type Request, type Response, type NextFunction } from "express";
import authRouter from './routes/authRouter.js';
import { initializeDatabase } from "./models/database.js";
import cors from "cors";
import { userRouter } from "./routes/userRouter.js";
import { catRouter } from "./routes/catRouter.js";
import { commentRouter } from "./routes/commentRouter.js";

async function startServer() {
  console.log("Starting server...");

  try {
    await initializeDatabase();
    console.log("Database initialized successfully!");
  } catch (err) {
    console.error("Error initializing database:", err);
    process.exit(1); // se fallisce il DB, chiudi subito
  }

  const app = express();
  const PORT = 3000;

  app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
  }));
  app.use(express.json());

  app.use('/auth', authRouter);
  app.use('/users', userRouter);
  app.use('/cats', catRouter);
  app.use('/comments', commentRouter);

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });

  // Error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    res.status(err.status || 500).json({
      code: err.status || 500,
      description: err.message || "An error occurred"
    });
  });

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
