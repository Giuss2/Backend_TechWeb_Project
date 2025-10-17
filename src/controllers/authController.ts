import Jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import type { JwtPayload, VerifyCallback } from "jsonwebtoken";
import {User, Cat} from '../models/indexModels.js';

export class AuthController{
    /**
   * @param {http.IncomingMessage} request 
   * @param {http.ServerResponse} response 
   */
  static async checkCredentials(req: Request, res: Response): Promise<boolean>{
    let user= User.build({
      userName: req.body.usr, 
      password: req.body.pwd
    });

    let found = await User.findOne({
      where: {
        userName: user?.get('userName') as string,
        password: user?.get('password') as string
      }
    });

    return found!==null;
  }

  static async saveUser(req: Request, res: Response): Promise<InstanceType<typeof User>>{
    let user= User.build({
      userName: req.body.usr, 
      password: req.body.pwd
    });

    return user.save();
  }


    static issueToken(username: string): string{
        return Jwt.sign({user:username}, process.env.TOKEN_SECRET!, {expiresIn: `${24*60*60}s`});
    }

    static isTokenValid(token: string, callback: VerifyCallback){
        Jwt.verify(token, process.env.TOKEN_SECRET!, callback);
    }

    static async canUserModifyCat(userName: string, catId: number){
      const cat = await Cat.findByPk(catId);
      return cat && cat.get('userName') === userName; //must exist and be associater with user
    }
}