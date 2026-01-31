import express, { type Request, type Response, type NextFunction } from "express";
import { CommentController } from "../controllers/CommentController.js";
import { enforceAuthentication, ensureUsersModifyOwnComments } from "../middleware/authorization.js";

export const commentRouter = express.Router();


commentRouter
  .route("/cats/:id/comments")
  .get((req: Request, res: Response, next: NextFunction) => {
    CommentController.getCommentsForCat(req)
      .then(comments => res.json(comments))
      .catch(next);
  })
  .post(enforceAuthentication, (req: Request, res: Response, next: NextFunction) => {
    CommentController.addComment(req)
      .then(comment => res.json(comment))
      .catch(next);
  });



// DELETE /comments/:id
commentRouter.delete("/comments/:id", ensureUsersModifyOwnComments, (req: Request, res: Response, next: NextFunction) => {
    CommentController.deleteComment(req)
      .then(result => {
        if (!result) return next({ status: 404, message: "Comment not found" });
        res.json({ message: "Comment deleted" });
      })
      .catch(next);
  }
);
