import type { Request } from "express";
import { Comment, User } from "../models/database.js";

export class CommentController {

  // GET: tutti i commenti di un gatto
  static async getCommentsForCat(req: Request) {
    const catId = Number(req.params.catId);

    return Comment.findAll({
      where: { catId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "username"]
        }
      ]
    });
  }

  // POST: aggiunge un commento (utente autenticato)
  static async addComment(req: Request) {
  const catId = Number(req.params.catId);
  const userId = req.body.userId;
  const { testo } = req.body;

  if (!userId) {
    throw { status: 401, message: "Unauthorized" };
  }

  // crea il commento
  const newComment = await Comment.create({
  catId,
  userId,
  testo
});

// cast per TypeScript
const commentId = (newComment as any).id;

const commentWithUser = await Comment.findByPk(commentId, {
  include: [
    {
      model: User,
      attributes: ["id", "username"]
    }
  ]
});

return commentWithUser;

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
