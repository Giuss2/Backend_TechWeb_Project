import Jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import type { JwtPayload, VerifyCallback } from "jsonwebtoken";
import {User} from '../models/User.js';
import {Cat} from "../models/Cat.js";

export class AuthController{
    /**
   * @param {http.IncomingMessage} request 
   * @param {http.ServerResponse} response 
   */
  static async checkCredentials(req: Request, res: Response): Promise<boolean>{
    let user = new User({
      userName: req.body.usr, 
      password: req.body.pwd
    });

    let found = await User.findOne({
      where: {
        userName: user.userName,
        password: user.password 
      }
    });

    return found!==null;
  }


    static issueToken(username: string): string{
        return Jwt.sign({user:username}, process.env.TOKEN_SECRET!, {expiresIn: `${24*60*60}s`});
    }

    static isTokenValid(token: string, callback: VerifyCallback){
        Jwt.verify(token, process.env.TOKEN_SECRET!, callback);
    }

    static async canUserModifyCat(user, catId){
      const cat = await Cat.findByPk(catId);
      return cat && cat.UserUserName === user; //must exist and be associater with user
    }
}