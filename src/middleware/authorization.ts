import { type NextFunction, type Request, type Response } from "express";
import { AuthController } from "../controllers/authController.js";
import { type JwtPayload } from "jsonwebtoken";

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
      id: payload.id,
      userName: payload.userName
    };

    next();
  });
}


export async function ensureUsersModifyOwnCats(req: Request, res: Response, next: NextFunction) {

  // only authenticated users can proceed
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

  const userId = req.body.userId;

  const userHasPermission = await AuthController.canUserModifyCat(userId, catId);
  //only author 
  if (userHasPermission) {
    next();
  } else {
    next({
      status: 403,
      message: "Forbidden! You do not have permissions to view or modify this resource"
    });
  }
}
