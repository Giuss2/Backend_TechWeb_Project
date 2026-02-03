import { type NextFunction, type Request, type Response } from "express";
import { AuthController } from "../controllers/authController.js";
import { type JwtPayload } from "jsonwebtoken";
import { Comment } from "../models/database.js"; 

export function enforceAuthentication(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next({ status: 401, message: "Unauthorized - No auth header" });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return next({ status: 401, message: "Unauthorized - No token" });
  }

  AuthController.isTokenValid(token, (err, decodedToken) => {
    if (err || !decodedToken || typeof decodedToken === "string") {
      return next({ status: 401, message: "Unauthorized - Invalid token" });
    }

    const payload = decodedToken as JwtPayload & { id: number; userName: string };

    (req as any).user = {
      userId: payload.id,
      userName: payload.userName
    };



    next();
  });
}


export async function ensureUsersModifyOwnCats(req: Request, res: Response, next: NextFunction) {
  await new Promise<void>((resolve, reject) => {
    enforceAuthentication(req, res, (err?: any) => {
      if (err) reject(err);
      else resolve();
    });
  }).catch(err => {
    return next(err);
  });

  const catId = Number(req.params.id);
  if (Number.isNaN(catId)) {
    return next({ status: 400, message: "Invalid cat id" });
  }

  const user = (req as any).user;
  if (!user) {
    return next({ status: 401, message: "Unauthorized - user not found" });
  }

  const userHasPermission = await AuthController.canUserModifyCat(user.userId, catId); 

  if (userHasPermission) {
    next();
  } else {
    next({
      status: 403,
      message: "Forbidden! You do not have permissions to view or modify this resource"
    });
  }
}

export async function ensureUsersModifyOwnComments(req: Request, res: any, next: NextFunction) {
  // utente loggato
  await new Promise<void>((resolve, reject) => {
    enforceAuthentication(req, res, (err?: any) => {
      if (err) reject(err);
      else resolve();
    });
  }).catch(err => {
    return next(err);
  });

  const user = (req as any).user;
  if (!user) return next({ status: 401, message: "Unauthorized - user not found" });

  // Recupera il commento dal DB
  const commentId = Number(req.params.id);
  if (Number.isNaN(commentId)) return next({ status: 400, message: "Invalid comment id" });

  const comment = await Comment.findByPk(commentId);
  if (!comment) return next({ status: 404, message: "Comment not found" });

  // Controlla se l’utente loggato è l’autore
  if (comment.getDataValue("userId") === user.userId) {
    next(); 
  } else {
    next({ status: 403, message: "Forbidden! You cannot delete this comment" });
  }
}
