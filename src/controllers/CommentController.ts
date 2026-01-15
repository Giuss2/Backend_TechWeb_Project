import type { Request } from "express";
import { Comment, User } from "../models/database.js";

export class CommentController {

  // GET: tutti i commenti di un gatto
  static async getCommentsForCat(req: Request) {
    const catId = Number(req.params.id);

    if (Number.isNaN(catId)) {
      throw { status: 400, message: "Invalid cat id" };
    }

    return Comment.findAll({
      where: { catId },
      order: [["dataCommento", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "userName"]
        }
      ]
    });
  }

  // POST: aggiunge un commento (utente autenticato)
  static async addComment(req: Request) {
 console.log("PARAMS:", req.params);
  console.log("BODY:", req.body);
  console.log("HEADERS:", req.headers.authorization);

    const catId = Number(req.params.id);
    const userId = req.body.userId;
    const { testo } = req.body;

    console.log("catId:", catId);
    console.log("userId:", userId);
    console.log("testo:", testo);

    if (!userId || Number.isNaN(catId) || !testo) {
      throw { status: 400, message: "Invalid data (catId, userId or testo)" };
    }

    const newComment = await Comment.create({
      catId,
      userId,
      testo
    });

    const fullComment = await Comment.findByPk(newComment.getDataValue("id"), {
    include: [
      {
        model: User,
        attributes: ["id", "userName"]
      }
    ]
  });

    return fullComment;
  }

  // DELETE: elimina un commento (solo autore)
  static async deleteComment(req: Request) {
    const commentId = Number(req.params.id);
    const userId = req.body.userId;

    const comment = await Comment.findByPk(commentId);
    if (!comment) return null;

    if (comment.get("userId") !== userId) {
      return "FORBIDDEN";
    }

    await comment.destroy();
    return comment;
  }
}
