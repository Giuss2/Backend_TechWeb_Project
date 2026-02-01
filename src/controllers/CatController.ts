import type { Request } from "express";
import { Cat, User } from "../models/database.js";
import sanitizeHtml from "sanitize-html";

export class CatController {

  
  static async listAllCats(req: Request) {
    const { userId } = req.query;
    const where: any = {};

    if (userId) {
      where.userId = userId;
    }

    return Cat.findAll({ where,
      order: [["dataInserimento", "DESC"]],
      include: [{
        model: User,
        attributes: ["id", "userName"]
      }]
    });
  }

  static async saveCat(req: Request) {

    const user = (req as any).user;

    if (!user) {
      throw { status: 401, message: "Unauthorized" };
    }

    const { titolo, descrizione, lat, lng, foto } = req.body;

    // --- Input validation ---
    if (!titolo || !descrizione) throw { status: 400, message: "Missing fields" };

    if (typeof titolo !== "string" || titolo.length > 50) 
      throw { status: 400, message: "Titolo invalido (max 50 caratteri)" };

    if (typeof descrizione !== "string" || descrizione.length > 1000)
      throw { status: 400, message: "Descrizione invalida (max 1000 caratteri)" };

    if (typeof lat !== "number" || lat < -90 || lat > 90)
      throw { status: 400, message: "Latitudine invalida" };

    if (typeof lng !== "number" || lng < -180 || lng > 180)
      throw { status: 400, message: "Longitudine invalida" };

    if (foto && (typeof foto !== "string" || foto.length > 100))
      throw { status: 400, message: "Nome file foto troppo lungo" };

     // --- Sanitization ---
    const cleanTitolo = sanitizeHtml(titolo, { allowedTags: [], allowedAttributes: {} });
    const cleanDescrizione = sanitizeHtml(descrizione, { allowedTags: [], allowedAttributes: {} });

    const cat = await Cat.create({
      titolo: cleanTitolo,
      descrizione: cleanDescrizione,
      lat,
      lng,
      foto: foto?.trim() || undefined,
      userId: user.userId
    });

    
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

    const { titolo, descrizione, lat, lng, foto } = req.body;
    const updates: any = {};

    if (titolo) {
      if (typeof titolo !== "string" || titolo.length > 50)
        throw { status: 400, message: "Titolo invalido (max 50 caratteri)" };
      updates.titolo = sanitizeHtml(titolo, { allowedTags: [], allowedAttributes: {} });
    }

    if (descrizione) {
      if (typeof descrizione !== "string" || descrizione.length > 1000)
        throw { status: 400, message: "Descrizione invalida (max 1000 caratteri)" };
      updates.descrizione = sanitizeHtml(descrizione, { allowedTags: [], allowedAttributes: {} });
    }

    if (lat !== undefined) {
      if (typeof lat !== "number" || lat < -90 || lat > 90)
        throw { status: 400, message: "Latitudine invalida" };
      updates.lat = lat;
    }

    if (lng !== undefined) {
      if (typeof lng !== "number" || lng < -180 || lng > 180)
        throw { status: 400, message: "Longitudine invalida" };
      updates.lng = lng;
    }

    if (foto !== undefined) {
      if (typeof foto !== "string" || foto.length > 100)
        throw { status: 400, message: "Nome file foto troppo lungo" };
      updates.foto = foto.trim();
    }

    await cat.update(updates);
    return cat;
  }



  static async deleteCat(req: Request) {
    const cat = await Cat.findByPk(req.params.id);
    if (!cat) return null;
  
    await cat.destroy();
    return cat;
  }
}
