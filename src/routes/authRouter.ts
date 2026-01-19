import express from 'express';
import { AuthController } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e password richieste' });
    }

   const user = await AuthController.checkCredentials(email, password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials. Try again.' });
  }

const userId = user.getDataValue('id');
const userName = user.getDataValue('userName');
  const token = AuthController.issueToken(userId, userName);
  res.json({ token });

  } catch (err) {
    next(err);
  }
});


authRouter.post("/signup", async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        error: "Username, email e password richiesti"
      });
    }

    const existingUser = await AuthController.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        error: "Email già registrata"
      });
    }

    const user = await AuthController.saveUser(userName, email, password);

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.getDataValue("id"),
        email: user.getDataValue("email"),
        userName: user.getDataValue("userName")
      }
    });

  } catch (err) {
    next(err);
  }
});



export default authRouter;  //uso default perché è l'unica cosa che voglio esportare