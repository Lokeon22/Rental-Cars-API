import { connection as knex } from "../database/knex";
import { Request, Response } from "express";

class RentalsController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    return res.json({ message: name });
  }
}

export { RentalsController };
