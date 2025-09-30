import express from 'express';
import { AuthController } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post('/login', (req, res) => {
  // logica login
  res.send('Login effettuato');
});

export default authRouter;