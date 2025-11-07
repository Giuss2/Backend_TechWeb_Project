import { type NextFunction, type Request, type Response } from "express";
import { AuthController } from "../controllers/authController.js";
import { type JwtPayload } from "jsonwebtoken";

export function enforceAuthentication(req: Request, res: Response, next: NextFunction){
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1];
  if(!token){
    next({status: 401, message: "Unauthorized"});
    return;
  }
   AuthController.isTokenValid(token, (err, decodedToken) => {
    if(err){
      next({status: 401, message: "Unauthorized"});
    } else {
        if (!decodedToken || typeof decodedToken === "string") {
            next({ status: 401, message: "Unauthorized" });
            return;
        }

        const payload = decodedToken as JwtPayload & { user: string };

        req.username = payload.user;
        next();
    }
  });
}

export async function ensureUsersModifyOwnCats(req: Request, res: Response, next: NextFunction){
  
  //only authenticated user can own cat's pages
  await new Promise<void>((resolve, reject) => {
    enforceAuthentication(req, res, (err?: any) => {
      if (err) reject(err);
      else resolve();
    });
  }).catch(err => {
    return next(err);
  });

  const catId = Number(req.params.id);
  if(Number.isNaN(catId)){
    next({ status: 400, message: "Invalid cat id" });
    return;
  }

  const userHasPermission = await AuthController.canUserModifyCat(req.username!, catId);  //username exists
  //must be the author
  if(userHasPermission){
    next();
  } else {
    next({
      status: 403, 
      message: "Forbidden! You do not have permissions to view or modify this resource"
    });
  }
}