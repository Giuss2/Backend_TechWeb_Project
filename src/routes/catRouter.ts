import express, { type NextFunction, type Request, type Response } from "express";
import { CatController } from "../controllers/CatController.js";
import {enforceAuthentication, ensureUsersModifyOwnCats} from "../middleware/authorization.js";

export const catRouter= express.Router();

//retrive all cat's pages of an author
catRouter.get("/cats", (req: Request, res: Response, next: NextFunction) => {
  CatController.getCatsForCurrentUser(req).then(catItems => {
    res.json(catItems)
  }).catch(err => {
    next(err);
  });
});

//retrive a single cat's page
catRouter.get("/cats/:id", (req: Request, res: Response, next: NextFunction) => {
  CatController.findById(req)
    .then(cat => {
      if (cat)
        res.json(cat);
      else
        next({ status: 404, message: "Cat not found" });
    })
    .catch(next);
});

catRouter.post("/cats", enforceAuthentication, (req: Request, res: Response, next: NextFunction) => {
  CatController.saveCat(req)
    .then(result => res.json(result))
    .catch(next);
});

//authors can modify only his own cat's pages
catRouter.put("/cats/:id", ensureUsersModifyOwnCats, (req, res, next) => {
  CatController.updateCat(req)
    .then(cat => cat ? res.json(cat) : next({status: 404, message: "Cat not found"}))
    .catch(next);
});

//authors can delete only his own cat's pages
catRouter.delete("/cats/:id", ensureUsersModifyOwnCats, (req, res, next) => {
  CatController.deleteCat(req)
    .then(cat => cat ? res.json({ message: "Cat deleted" }) : next({status: 404, message: "Cat not found"}))
    .catch(next);
});
