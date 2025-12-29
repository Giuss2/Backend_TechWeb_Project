import {} from "express";
import { User, Cat, Comment } from "../models/indexModels.js";
export class UserController {
    static async getUserProfile(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id, {
                attributes: ["id", "userName", "createdAt"],
            });
            if (!user)
                return res.status(404).json({ message: "User not found" });
            res.json(user);
        }
        catch (err) {
            console.error("Error retrieving user profile:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    static async getUserComments(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                res.status(404);
                return res.json({ error: "User not found" });
            }
            const comments = await Comment.findAll({
                where: { userId: id },
                attributes: ["id", "text", "catId", "createdAt"],
                order: [["createdAt", "DESC"]],
            });
            res.json(comments);
        }
        catch (error) {
            console.error("Error retrieving user comments:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    static async getUserCats(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user)
                return res.status(404).json({ message: "User not found" });
            const cats = await Cat.findAll({
                where: { userId: id },
                attributes: ["id", "title", "photoUrl", "createdAt"],
                order: [["createdAt", "DESC"]],
            });
            res.json(cats);
        }
        catch (err) {
            console.error("Error retrieving user's cats:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
//# sourceMappingURL=UserController.js.map