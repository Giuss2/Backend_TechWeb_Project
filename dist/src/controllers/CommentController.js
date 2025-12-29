import { Comment } from "../models/indexModels.js";
export class CommentController {
    static async getCommentsForCat(req) {
        const catId = Number(req.params.catId);
        return Comment.findAll({
            where: { CatId: catId },
            order: [['createdAt', 'DESC']]
        });
    }
    static async addComment(req) {
        const catId = Number(req.params.catId);
        const comment = Comment.build({
            CatId: catId,
            UserUserName: req.username,
            content: req.body.content
        });
        return comment.save();
    }
    static async deleteComment(req) {
        const commentId = Number(req.params.id);
        const comment = await Comment.findByPk(commentId);
        if (!comment)
            return null;
        if (comment.get('UserUserName') !== req.username) {
            return "FORBIDDEN";
        }
        await comment.destroy();
        return comment;
    }
}
//# sourceMappingURL=CommentController.js.map