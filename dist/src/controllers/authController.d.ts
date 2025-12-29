import type { Request, Response } from "express";
import type { VerifyCallback } from "jsonwebtoken";
import { User } from '../models/indexModels.js';
export declare class AuthController {
    static checkCredentials(req: Request, res: Response): Promise<boolean>;
    static saveUser(req: Request, res: Response): Promise<InstanceType<typeof User>>;
    static issueToken(username: string): string;
    static isTokenValid(token: string, callback: VerifyCallback): void;
    static canUserModifyCat(userName: string, catId: number): Promise<boolean | null>;
}
//# sourceMappingURL=authController.d.ts.map