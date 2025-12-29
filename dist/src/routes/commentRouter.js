import express, {} from "express";
import { CommentController } from "../controllers/CommentController.js";
import { enforceAuthentication } from "../middleware/authorization.js";
export const commentRouter = express.Router();
commentRouter.get("/cats/:catId/comments", (req, res, next) => {
    CommentController.getCommentsForCat(req)
        .then(comments => res.json(comments))
        .catch(next);
});
commentRouter.post("/cats/:catId/comments", enforceAuthentication, (req, res, next) => {
    CommentController.addComment(req)
        .then(comment => res.json(comment))
        .catch(next);
});
commentRouter.delete("/comments/:id", enforceAuthentication, (req, res, next) => {
    CommentController.deleteComment(req)
        .then(result => {
        if (result === "FORBIDDEN") {
            return next({ status: 403, message: "Forbidden" });
        }
        if (!result)
            return next({ status: 404, message: "Comment not found" });
        res.json({ message: "Comment deleted" });
    })
        .catch(next);
});
//# sourceMappingURL=commentRouter.js.map