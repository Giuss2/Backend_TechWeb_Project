import { type Request, type Response } from "express";
import { User, Cat, Comment } from "../models/indexModels.js";

export class UserController{
     
    static async getUserProfile(req: Request, res: Response) {
        try {
            const {id} = req.params;

            const user = await User.findByPk(id, {
                attributes: ["id", "userName", "createdAt"], //don't expose password
            });

            if (!user)
                return res.status(404).json({ message: "User not found" });

            res.json(user);
        } catch (err) {
            console.error("Error retrieving user profile:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // all user's comments
    static async getUserComments(req: Request, res: Response) {
        try {
            const {id} = req.params;

            const user = await User.findByPk(id);
            if (!user) {
                res.status(404);
                return res.json({ error: "User not found" });
            }

            const comments = await Comment.findAll({
                where: { userId: id },
                attributes: ["id", "text", "catId", "createdAt"],
                order: [["createdAt", "DESC"]],     //show most recent comments first
            });

            res.json(comments);
        } catch (error) {
            console.error("Error retrieving user comments:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    // show cat pages of an user
    static async getUserCats(req: Request, res: Response) {
        try {
            const {id} = req.params;

            // check the existence of an user
            const user = await User.findByPk(id);
            if (!user)
                return res.status(404).json({ message: "User not found" });

            const cats = await Cat.findAll({
                where: { userId: id },
                attributes: ["id", "title", "photoUrl", "createdAt"],
                order: [["createdAt", "DESC"]],     //show most recent cat pages first
            });

            res.json(cats);
        } catch (err) {
            console.error("Error retrieving user's cats:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }

}
