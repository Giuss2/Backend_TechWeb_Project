import express, { type NextFunction, type Request, type Response } from "express";
import { CatController } from "../controllers/CatController.js";
import {ensureUsersModifyOwnCats} from "../middleware/authorization.js";

export const catRouter= express.Router();

catRouter.get("/cats", (req: Request, res: Response, next: NextFunction) => {
  CatController.getCatsForCurrentUser(req).then(catItems => {
    res.json(catItems)
  }).catch(err => {
    next(err);
  });
});

catRouter.post("/cats", (req: Request, res: Response, next: NextFunction) => {
  CatController.saveCat(req).then( result => {
    res.json(result);
  }).catch(err => {
    next(err);
  });
});

catRouter.get("/cats/:id", ensureUsersModifyOwnCats, (req: Request, res: Response, next: NextFunction) => {
  CatController.findById(req).then( (item) => {
    if(item)
      res.json(item);
    else 
      next({status: 404, message: "Cat not found"});
  }).catch( err => {
    next(err);
  })
});

catRouter.put("/cats/:id", ensureUsersModifyOwnCats, (req, res, next) => {
  CatController.updateCat(req)
    .then(cat => cat ? res.json(cat) : next({status: 404, message: "Cat not found"}))
    .catch(next);
});

catRouter.delete("/cats/:id", ensureUsersModifyOwnCats, (req, res, next) => {
  CatController.deleteCat(req)
    .then(cat => cat ? res.json({ message: "Cat deleted" }) : next({status: 404, message: "Cat not found"}))
    .catch(next);
});
