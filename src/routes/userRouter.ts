import express, { type Request, type Response } from "express";
import { UserController } from "../controllers/UserController.js";

export const userRouter = express.Router();

// profilo pubblico dell'utente
userRouter.get("/:id", async (req: Request, res: Response) => {
  await UserController.getUserProfile(req, res);        //AWAIT ??SERVE? 
});

// tutti i commenti pubblicati da un utente
userRouter.get("/:id/comments", async (req: Request, res: Response) => {
  await UserController.getUserComments(req, res);
});


// gatti inseriti dall'utente
userRouter.get("/:id/cats", async (req: Request, res: Response) => {
  await UserController.getUserCats(req, res);
});


