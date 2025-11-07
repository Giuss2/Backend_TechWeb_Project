import express, { type Request, type Response } from "express";
import { UserController } from "../controllers/UserController.js";

export const userRouter = express.Router();

// Public user's profile
userRouter.get("/:id", async (req: Request, res: Response) => {
  await UserController.getUserProfile(req, res);        //AWAIT ??SERVE? 
});

// all user's comments
userRouter.get("/:id/comments", async (req: Request, res: Response) => {
  await UserController.getUserComments(req, res);
});


// show cat pages of an user
userRouter.get("/:id/cats", async (req: Request, res: Response) => {
  await UserController.getUserCats(req, res);
});


