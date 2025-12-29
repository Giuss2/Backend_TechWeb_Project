import Jwt from "jsonwebtoken";
import { User, Cat } from '../models/indexModels.js';
export class AuthController {
    static async checkCredentials(req, res) {
        let user = User.build({
            userName: req.body.usr,
            password: req.body.pwd
        });
        let found = await User.findOne({
            where: {
                userName: user?.get('userName'),
                password: user?.get('password')
            }
        });
        return found !== null;
    }
    static async saveUser(req, res) {
        let user = User.build({
            userName: req.body.usr,
            password: req.body.pwd
        });
        return user.save();
    }
    static issueToken(username) {
        return Jwt.sign({ user: username }, process.env.TOKEN_SECRET, { expiresIn: `${24 * 60 * 60}s` });
    }
    static isTokenValid(token, callback) {
        Jwt.verify(token, process.env.TOKEN_SECRET, callback);
    }
    static async canUserModifyCat(userName, catId) {
        const cat = await Cat.findByPk(catId);
        return cat && cat.get('userName') === userName;
    }
}
//# sourceMappingURL=authController.js.map