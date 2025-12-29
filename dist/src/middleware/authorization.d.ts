import { type NextFunction, type Request, type Response } from "express";
export declare function enforceAuthentication(req: Request, res: Response, next: NextFunction): void;
export declare function ensureUsersModifyOwnCats(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=authorization.d.ts.map