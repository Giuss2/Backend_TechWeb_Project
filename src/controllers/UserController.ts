import { type Request, type Response } from "express";
import { User, Cat, Comment } from "../models/indexModels.js";

export class UserController{
    // mostra il profilo utente 
    static async getUserProfile(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id, {
                attributes: ["id", "userName", "createdAt"], // non esponiamo password
            });

            if (!user)
                return res.status(404).json({ message: "Utente non trovato" });

            res.json(user);
        } catch (err) {
            console.error("Errore nel recupero del profilo:", err);
            res.status(500).json({ message: "Errore interno del server" });
        }
    }

    // tutti i commenti pubblicati da un utente
    static async getUserComments(req: Request, res: Response) {
        try {
            const {id} = req.params;

            const user = await User.findByPk(id);
            if (!user) {
                res.status(404);
                return res.json({ error: "Utente non trovato" });
            }

            const comments = await Comment.findAll({
                where: { userId: id },
                attributes: ["id", "text", "catId", "createdAt"],
                order: [["createdAt", "DESC"]],
            });

            res.json(comments);
        } catch (error) {
            console.error("Errore nel recupero dei commenti utente:", error);
            res.status(500).json({ error: "Errore interno del server" });
        }
    }

    // mostra tutti i gatti inseriti da un utente
    static async getUserCats(req: Request, res: Response) {
        try {
            const {id} = req.params;

            // verifica che l'utente esista
            const user = await User.findByPk(id);
            if (!user)
                return res.status(404).json({ message: "Utente non trovato" });

            const cats = await Cat.findAll({
                where: { userId: id },
                attributes: ["id", "title", "photoUrl", "createdAt"],
                order: [["createdAt", "DESC"]],
            });

            res.json(cats);
        } catch (err) {
            console.error("Errore nel recupero dei gatti dell'utente:", err);
            res.status(500).json({ message: "Errore interno del server" });
        }
    }

}
