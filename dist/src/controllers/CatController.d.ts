import type { Request } from "express";
export declare class CatController {
    static getCatsForCurrentUser(req: Request): Promise<import("sequelize").Model<any, any>[]>;
    static saveCat(req: Request): Promise<import("sequelize").Model<any, any>>;
    static findById(req: Request): Promise<import("sequelize").Model<any, any> | null>;
    static updateCat(req: Request): Promise<import("sequelize").Model<any, any> | null>;
    static deleteCat(req: Request): Promise<import("sequelize").Model<any, any> | null>;
}
//# sourceMappingURL=CatController.d.ts.map