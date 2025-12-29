import express, {} from "express";
import { UserController } from "../controllers/UserController.js";
export const userRouter = express.Router();
userRouter.get("/:id", async (req, res) => {
    await UserController.getUserProfile(req, res);
});
userRouter.get("/:id/comments", async (req, res) => {
    await UserController.getUserComments(req, res);
});
userRouter.get("/:id/cats", async (req, res) => {
    await UserController.getUserCats(req, res);
});
//# sourceMappingURL=userRouter.js.map