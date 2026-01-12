import type { Request } from "express";
import { Cat } from "../models/database.js";

export class CatController {

    // GET /cats?userId=3
    static async listAllCats(req: Request) {
        const { userId } = req.query;
        const where: any = {};

        if (userId) {
            where.userId = userId;
        }

        return Cat.findAll({
            where,
            order: [["createdAt", "DESC"]]
        });
    }

    static async saveCat(req: Request) {
        const cat = Cat.build(req.body);
        cat.set('userId', req.body.userId);
        return cat.save();
    }

    static async findById(req: Request) {
        return Cat.findByPk(req.params.id);
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
