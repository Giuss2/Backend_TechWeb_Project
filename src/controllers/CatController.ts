import type { Request } from "express";
import { Cat, User } from "../models/database.js";

export class CatController {

    // GET /cats?userId=3
    static async listAllCats(req: Request) {
        const { userId } = req.query;
        const where: any = {};

        if (userId) {
            where.userId = userId;
        }

         return Cat.findAll({ where,
            order: [["dataInserimento", "DESC"]],
            include: [
            {
                model: User,
                attributes: ["id", "userName"]
            }
            ]
        });
    }

    static async saveCat(req: Request) {

  const user = (req as any).user;

  if (!user) {
    throw { status: 401, message: "Unauthorized" };
  }

  const data = {
    ...req.body,
    userId: user.userId,
    foto:
      req.body.foto && req.body.foto.trim() !== ""
        ? req.body.foto
        : undefined
  };

  const cat = await Cat.create(data);
  return cat;
}



static async findById(req: Request) {
    return Cat.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["id", "userName"]
        }
      ]
    });
  }
    static async updateCat(req: Request) {
        const cat = await Cat.findByPk(req.params.id);
        if (!cat) return null;
        await cat.update(req.body);
        return cat;
    }

    static async deleteCat(req: Request) {
        const cat = await Cat.findByPk(req.params.id);
        if (!cat) return null;
        await cat.destroy();
        return cat;
    }
}
