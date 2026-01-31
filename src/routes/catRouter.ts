import express, { type NextFunction, type Request, type Response } from "express";
import { CatController } from "../controllers/CatController.js";
import { enforceAuthentication, ensureUsersModifyOwnCats } from "../middleware/authorization.js";

export const catRouter = express.Router();


// /cats
catRouter
  .route("/")
  .get((req: Request, res: Response, next: NextFunction) => {   // retrive all cats
    CatController.listAllCats(req)
      .then(cats => res.json(cats))
      .catch(next);
  })
  .post(enforceAuthentication, (req: Request, res: Response, next: NextFunction) => {
    CatController.saveCat(req)
      .then(result => res.json(result))
      .catch(next);
  });


  
// /cats/:id
catRouter
  .route("/:id")
  .get((req: Request, res: Response, next: NextFunction) => {   //retrive cat by id
    CatController.findById(req)
      .then(cat => cat ? res.json(cat) : next({ status: 404, message: "Cat not found" }))
      .catch(next);
  })
  .put(ensureUsersModifyOwnCats, (req: Request, res: Response, next: NextFunction) => { //(Only author can)
    CatController.updateCat(req)
      .then(cat => cat ? res.json(cat) : next({ status: 404, message: "Cat not found" }))
      .catch(next);
  })
  .delete(ensureUsersModifyOwnCats, (req: Request, res: Response, next: NextFunction) => {  //(Only author can)
    CatController.deleteCat(req)
      .then(cat => cat ? res.json({ message: "Cat deleted" }) : next({ status: 404, message: "Cat not found" }))
      .catch(next);
  });

