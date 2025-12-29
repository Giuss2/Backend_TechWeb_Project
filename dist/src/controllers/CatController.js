import { Cat } from "../models/indexModels.js";
export class CatController {
    static async getCatsForCurrentUser(req) {
        return Cat.findAll({
            where: {
                UserUserName: req.username
            }
        });
    }
    static async saveCat(req) {
        let cat = Cat.build(req.body);
        cat.set('UserUserName', req.username);
        return cat.save();
    }
    static async findById(req) {
        return Cat.findByPk(req.params.id);
    }
    static async updateCat(req) {
        const cat = await Cat.findByPk(req.params.id);
        if (!cat)
            return null;
        await cat.update(req.body);
        return cat;
    }
    static async deleteCat(req) {
        const cat = await Cat.findByPk(req.params.id);
        if (!cat)
            return null;
        await cat.destroy();
        return cat;
    }
}
//# sourceMappingURL=CatController.js.map