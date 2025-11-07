import type { Request } from "express";
import {Comment} from "../models/indexModels.js";

export class CommentController{
    // all cat page's comments
  static async getCommentsForCat(req: Request) {
    const catId = Number(req.params.catId);
    if (isNaN(catId)) return [];

    return Comment.findAll({
      where: { CatId: catId }, 
      order: [['createdAt', 'ASC']]
    });
  }
  
  static async addComment(req: Request) {
    const catId = Number(req.params.catId);
    if (isNaN(catId)) return null;

    const comment = Comment.build({
      CatId: catId,
      UserUserName: req.username, // set the author
      content: req.body.content
    });

    return comment.save();
  }

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