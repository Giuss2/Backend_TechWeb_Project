import type { Request } from "express";
import {Comment} from "../models/database.js";
import jwt from "jsonwebtoken";

export class CommentController{
    // all cat page's comments
  static async getCommentsForCat(req: Request) {
    const catId = Number(req.params.catId);

    return Comment.findAll({
      where: { catId: catId }, 
      order: [['createdAt', 'DESC']]  //show most recent comments first
    });
  }
  
  // Only the author can add a comment
  static async addComment(req: Request) {
  const comment = Comment.build({
    catId: Number(req.params.catId),
    userId: req.body.userId,
    testo: req.body.testo
  });

  await comment.save();
  return comment;
}

  static async deleteComment(req: Request) {
    const commentId = Number(req.params.id);

    const comment = await Comment.findByPk(commentId);
    if (!comment) return null;

    // Only the author (potrei pure fare che l'autore del sito ha determinati 'privilegi') can delete
    if (comment.get('userId') !== req.body.username) {
      return "FORBIDDEN";
    }


    await comment.destroy();
    return comment;
  }
}