import Jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import type { VerifyCallback } from "jsonwebtoken";
import {User, Cat} from '../models/database.js';
import type { UserAttributes, UserCreationAttributes } from "../models/User.js";
import type { Model } from "sequelize";
import { createHash } from "crypto";

export class AuthController{
  
  static async checkCredentials(email: string, password: string): Promise<Model<UserAttributes, UserCreationAttributes> | null> {
  if (!password) throw new Error("Password is required");

  const user = await User.findOne({ where: { email } });
  if (!user) return null;

  const hashedPassword = createHash("sha256").update(password).digest("hex");

  if (user.getDataValue('password') !== hashedPassword) return null;

  return user;
}

  static async saveUser(userName: string, email: string, password: string) {
    if (!userName) throw new Error("Username is required");
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");

    const user = User.build({ userName, email, password });
    return user.save();
}



  static issueToken(userId: number, username: string): string {
    return Jwt.sign(
      { id: userId, userName: username },
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
  static async canUserModifyCat(userId: number, catId: number) {
    const cat = await Cat.findByPk(catId);
    return cat !== null && cat.getDataValue('userId') === userId;
  }
}