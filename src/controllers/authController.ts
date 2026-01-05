import Jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import type { VerifyCallback } from "jsonwebtoken";
import {User, Cat} from '../models/indexModels.js';
import type { UserAttributes, UserCreationAttributes } from "../models/User.js";
import type { Model } from "sequelize";
import { createHash } from "crypto";

export class AuthController{
  
  static async checkCredentials(email: string, password: string): Promise<Model<UserAttributes, UserCreationAttributes> | null> {
   if (!password) throw new Error("Password is required");

    const hashedPassword = createHash("sha256").update(password).digest("hex");  

    const user = await User.findOne({
      where: { email, password: hashedPassword }
    });

    return user;
  }

  static async saveUser(email: string, password: string){
    if (!password) throw new Error("Password is required");
    if (!email) throw new Error("Email is required");

    const user = User.build({ userName: "nickname", email, password });
    return user.save();
  }


  static issueToken(username: string): string {
    return Jwt.sign(
      { user: username },
      process.env.TOKEN_SECRET!,
      { expiresIn: `${24 * 60 * 60}s` } // 1 giorno
    );
  }

  static isTokenValid(token: string, callback: VerifyCallback){
    Jwt.verify(token, process.env.TOKEN_SECRET!, callback);
  }

  static async getUserByEmail(email: string) {
    return User.findOne({ where: { email } });
  }


  //an user can modify a cat page ONLY if he is the author
  static async canUserModifyCat(userName: string, catId: number){
    const cat = await Cat.findByPk(catId);
    return cat && cat.get('userName') === userName; //must exist and be associater with user
  }
}