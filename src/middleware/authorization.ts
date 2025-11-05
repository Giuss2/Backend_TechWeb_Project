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
  const user = req.username;
  const catIdParam = req.params.id;

  if(!user){
    next({status: 401, message: "Unauthorized"});
    return;
  }

  const catId = Number(catIdParam);
  if(isNaN(catId)){
    next({ status: 400, message: "Invalid cat id" });
    return;
  }

  const userHasPermission = await AuthController.canUserModifyCat(user, catId);
  if(userHasPermission){
    next();
  } else {
    next({
      status: 403, 
      message: "Forbidden! You do not have permissions to view or modify this resource"
    });
  }

  
}