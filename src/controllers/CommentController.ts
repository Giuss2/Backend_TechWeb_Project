import type { Request } from "express";
import {Comment} from "../models/indexModels.js";

export class CommentController{
    // all cat page's comments
  static async getCommentsForCat(req: Request) {
    const catId = Number(req.params.catId);

    return Comment.findAll({
      where: { CatId: catId }, 
      order: [['createdAt', 'DESC']]  //show most recent comments first
    });
  }
  
  static async addComment(req: Request) {
    const catId = Number(req.params.catId);

    const comment = Comment.build({
      CatId: catId,
      UserUserName: req.username, // set the author
      content: req.body.content
    });

    return comment.save();
  }

  static async deleteComment(req: Request) {
    const commentId = Number(req.params.id);

    const comment = await Comment.findByPk(commentId);
    if (!comment) return null;

    // Only the author (potrei pure fare che l'autore del sito ha determinati 'privilegi') can delete
    if (comment.get('UserUserName') !== req.username) {
      return "FORBIDDEN";
    }

    await comment.destroy();
    return comment;
  }
}