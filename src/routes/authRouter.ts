import express from 'express';
import { AuthController } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  let isAuthenticated = await AuthController.checkCredentials(req, res);
  if(isAuthenticated)
    res.json(AuthController.issueToken(req.body.usr));
  else{
    res.status(401);
    res.json( {error: "Invalid credentials. Try again."});
  }
});

export default authRouter;