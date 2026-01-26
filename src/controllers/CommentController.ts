import type { Request } from "express";
import { Comment, User } from "../models/database.js";
import Jwt from "jsonwebtoken";

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
  // catId
  const catId = Number(req.params.id);
  if (Number.isNaN(catId)) {
    throw { status: 400, message: "Invalid cat id" };
  }

  // testo
  const { testo } = req.body;
  if (!testo) {
    throw { status: 400, message: "Testo is required" };
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw { status: 401, message: "Missing Authorization header" };
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw { status: 401, message: "Invalid Authorization format" };
  }

  const token = parts[1];
  if (!token) {
    throw { status: 401, message: "Token missing" };
  }

  const secret = process.env.TOKEN_SECRET;
  if (!secret) {
    throw new Error("TOKEN_SECRET not configured");
  }

  let decoded: Jwt.JwtPayload;
  try {
    decoded = Jwt.verify(token, secret) as Jwt.JwtPayload;
  } catch {
    throw { status: 401, message: "Invalid token" };
  }

  // userId dal token
  const userId = decoded.id;
  if (!userId) {
    throw { status: 401, message: "Invalid token payload" };
  }

  const newComment = await Comment.create({
    catId,
    userId,
    testo
  });

  // commento + autore
  return Comment.findByPk(newComment.getDataValue("id"), {
    include: [
      {
        model: User,
        attributes: ["id", "userName"]
      }
    ]
  });
}



  // DELETE: elimina un commento (solo autore)
 static async deleteComment(req: Request) {
  const commentId = Number(req.params.id);
  const userId = (req as any).user.userId;

  const comment = await Comment.findByPk(commentId);
  if (!comment) return null;

  if (comment.get("userId") !== userId) {
    return "FORBIDDEN";
  }

  await comment.destroy();
  return comment;
}

}
