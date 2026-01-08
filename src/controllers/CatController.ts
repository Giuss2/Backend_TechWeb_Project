import type { Request } from "express";
import {Cat} from "../models/database.js"

export class CatController{


    static async listAllCats(req: Request){
        return Cat.findAll({
            order: [["createdAt", "DESC"]]  //show most recent cat pages first
        });
    }
    
    static async saveCat(req: Request){
        let cat= Cat.build(req.body);
        //let userName= cat.get('userName') 
        //userName= req.body.username;
        cat.set('userId', req.body.userId);
        return cat.save();
    }

    static async findById(req: Request){
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
        await cat.destroy(); //delete record
        return cat;
    }

}