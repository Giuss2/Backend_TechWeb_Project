import type { Request } from "express";
import { Comment, User } from "../models/database.js";
import Jwt from "jsonwebtoken";

export class CommentController {

  // GET: all comments of a cat page
static async getCommentsForCat(req: Request) {
  const catId = Number(req.params.id);
  if (Number.isNaN(catId)) {
    throw { status: 400, message: "Invalid cat id" };
  }

  // --- Pagination ---
  const page = Number(req.query.page) || 1;     // current page
  const limit = Number(req.query.limit) || 25;  // elements per page
  const offset = (page - 1) * limit;

  
  const { rows: comments, count } = await Comment.findAndCountAll({
    where: { catId },
    order: [["dataCommento", "DESC"]],
    include: [
      { model: User, attributes: ["id", "userName"] }
    ],
    limit,
    offset
  });

  return {
    comments,
    pagination: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit)
    }
  };
}


  // POST (olny if authenticated)
 static async addComment(req: Request) {
  // --- Validations ---
  const catId = Number(req.params.id);
  if (!catId) throw { status: 400, message: "Invalid cat id" };

  const { testo } = req.body;
  if (!testo) throw { status: 400, message: "Testo is required" };

  // --- Authorization ---
  const authHeader = req.headers.authorization;
  if (!authHeader) throw { status: 401, message: "Missing Authorization header" };

  const token = authHeader.split(" ")[1];
  if (!token) throw { status: 401, message: "Invalid Authorization token" };

  const secret = process.env.TOKEN_SECRET;
  if (!secret) throw new Error("TOKEN_SECRET not configured");

  let decoded: Jwt.JwtPayload;
  try {
    decoded = Jwt.verify(token, secret) as Jwt.JwtPayload;
  } catch {
    throw { status: 401, message: "Invalid token" };
  }

  const userId = decoded.id;
  if (!userId) throw { status: 401, message: "Invalid token payload" };

  const newComment = await Comment.create({
    catId,
    userId,
    testo
  });

  // comment + author
  return Comment.findByPk(newComment.getDataValue("id"), {
    include: [
      {
        model: User,
        attributes: ["id", "userName"]
      }
    ]
  });
}

  // DELETE (only the author of the comment can)
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
