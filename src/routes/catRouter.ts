import express, { type NextFunction, type Request, type Response } from "express";
import { CatController } from "../controllers/CatController.js";
import { enforceAuthentication, ensureUsersModifyOwnCats } from "../middleware/authorization.js";

export const catRouter = express.Router();

// GET /cats retrive all cats
catRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  CatController.listAllCats(req)
    .then(cats => res.json(cats))
    .catch(next);
});

// GET /cats/:id retrive cat by id
catRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  CatController.findById(req)
    .then(cat => {
      if (cat)
        res.json(cat);
      else
        next({ status: 404, message: "Cat not found" });
    })
    .catch(next);
});

// POST /cats 
catRouter.post("/", enforceAuthentication, (req: Request, res: Response, next: NextFunction) => {
  CatController.saveCat(req)
    .then(result => res.json(result))
    .catch(next);
});

// PUT /cats/:id (Only author can)
catRouter.put("/:id", ensureUsersModifyOwnCats, (req: Request, res: Response, next: NextFunction) => {
  CatController.updateCat(req)
    .then(cat => cat ? res.json(cat) : next({ status: 404, message: "Cat not found" }))
    .catch(next);
});

// DELETE /cats/:id (Only author can)
catRouter.delete("/:id", ensureUsersModifyOwnCats, (req: Request, res: Response, next: NextFunction) => {
  CatController.deleteCat(req)
    .then(cat => cat ? res.json({ message: "Cat deleted" }) : next({ status: 404, message: "Cat not found" }))
    .catch(next);
});
