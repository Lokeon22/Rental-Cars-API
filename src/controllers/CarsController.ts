import { connection as knex } from "../database/knex";
import { Request, Response } from "express";
import { AppError } from "../utils/AppError";

class CarsController {
  async create(req: Request, res: Response) {
    const {
      name,
      description,
      daily_rate,
      available,
      license_plate,
      fine_amount,
      brand,
    } = req.body;

    if (!name || !daily_rate || !available || !license_plate || !brand) {
      throw new AppError("Preencha todos os campos");
    }

    await knex("cars").insert({
      name,
      description,
      daily_rate,
      available,
      license_plate,
      fine_amount,
      brand,
    });

    return res.json();
  }
}

export { CarsController };
