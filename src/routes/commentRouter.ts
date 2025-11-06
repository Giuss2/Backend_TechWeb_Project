import express, { type NextFunction, type Request, type Response } from "express";
import { CommentController } from "../controllers/CommentController.js";
import { enforceAuthentication } from "../middleware/authorization.js";

export const commentRouter= express.Router();

//chiunque può vedere i commenti di un gatto
commentRouter.get("/cats/:catId/comments", (req: Request, res: Response, next: NextFunction) => {
  CommentController.getCommentsForCat(req)
    .then(comments => res.json(comments))
    .catch(next);
});

//solo gli autenticati possono aggiungere un commento
commentRouter.post("/cats/:catId/comments", enforceAuthentication, (req: Request, res: Response, next: NextFunction) => {
  CommentController.addComment(req)
    .then(comment => res.json(comment))
    .catch(next);
});

//solo gli autenticati possono eliminare un commento
commentRouter.delete("/comments/:id", enforceAuthentication, (req: Request, res: Response, next: NextFunction) => {
  CommentController.deleteComment(req)
    .then(result => {
      if (result === "FORBIDDEN") {
        return next({ status: 403, message: "Forbidden" });
      }
      if (!result) return next({ status: 404, message: "Comment not found" });
      res.json({ message: "Comment deleted" });
    })
    .catch(next);
});