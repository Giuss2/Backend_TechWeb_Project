import { AuthController } from "../controllers/authController";

export function enforceAuthentication(req, res, next){
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
      req.username = decodedToken.user;
      next();
    }
  });
}

export async function ensureUsersModifyOwnCats(req, res, next){
  const user = req.username;
  const catId = req.params.id;
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