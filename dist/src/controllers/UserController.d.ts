import { type Request, type Response } from "express";
export declare class UserController {
    static getUserProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getUserComments(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getUserCats(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=UserController.d.ts.map