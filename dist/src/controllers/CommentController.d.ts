import type { Request } from "express";
export declare class CommentController {
    static getCommentsForCat(req: Request): Promise<import("sequelize").Model<any, any>[]>;
    static addComment(req: Request): Promise<import("sequelize").Model<any, any>>;
    static deleteComment(req: Request): Promise<import("sequelize").Model<any, any> | "FORBIDDEN" | null>;
}
//# sourceMappingURL=CommentController.d.ts.map