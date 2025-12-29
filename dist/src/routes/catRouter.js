import express, {} from "express";
import { CatController } from "../controllers/CatController.js";
import { enforceAuthentication, ensureUsersModifyOwnCats } from "../middleware/authorization.js";
export const catRouter = express.Router();
catRouter.get("/cats", (req, res, next) => {
    CatController.getCatsForCurrentUser(req).then(catItems => {
        res.json(catItems);
    }).catch(err => {
        next(err);
    });
});
catRouter.get("/cats/:id", (req, res, next) => {
    CatController.findById(req)
        .then(cat => {
        if (cat)
            res.json(cat);
        else
            next({ status: 404, message: "Cat not found" });
    })
        .catch(next);
});
catRouter.post("/cats", enforceAuthentication, (req, res, next) => {
    CatController.saveCat(req)
        .then(result => res.json(result))
        .catch(next);
});
catRouter.put("/cats/:id", ensureUsersModifyOwnCats, (req, res, next) => {
    CatController.updateCat(req)
        .then(cat => cat ? res.json(cat) : next({ status: 404, message: "Cat not found" }))
        .catch(next);
});
catRouter.delete("/cats/:id", ensureUsersModifyOwnCats, (req, res, next) => {
    CatController.deleteCat(req)
        .then(cat => cat ? res.json({ message: "Cat deleted" }) : next({ status: 404, message: "Cat not found" }))
        .catch(next);
});
//# sourceMappingURL=catRouter.js.map