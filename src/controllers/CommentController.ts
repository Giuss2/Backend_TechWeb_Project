import type { Request } from "express";
import {Comment} from "../models/indexModels.js";

export class CommentController{
    // GET /cats/:catId/comments -> tutti i commenti di un gatto
  static async getCommentsForCat(req: Request) {
    const catId = Number(req.params.catId);
    if (isNaN(catId)) return [];

    return Comment.findAll({
      where: { CatId: catId }, // assume che tu abbia la foreign key CatId
      order: [['createdAt', 'ASC']]
    });
  }

  // POST /cats/:catId/comments -> aggiungi un commento
  static async addComment(req: Request) {
    const catId = Number(req.params.catId);
    if (isNaN(catId)) return null;

    const comment = Comment.build({
      CatId: catId,
      UserUserName: req.username, // assegna automaticamente l'autore
      content: req.body.content
    });

    return comment.save();
  }

  // DELETE /comments/:id
  static async deleteComment(req: Request) {
    const commentId = Number(req.params.id);
    if (isNaN(commentId)) return null;

    const comment = await Comment.findByPk(commentId);
    if (!comment) return null;

    // solo autore (potrei pure fare che l'autore del sito ha determinati 'privilegi') può cancellare
    if (comment.get('UserUserName') !== req.username) {
      return "FORBIDDEN";
    }

    await comment.destroy();
    return comment;
  }
}