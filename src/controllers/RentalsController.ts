import { connection as knex } from "../database/knex";
import { Request, Response } from "express";
import { AppError } from "../utils/AppError";

import { Rent } from "../types/Rent";

class RentalsController {
  async create(req: Request, res: Response) {
    const { id } = req.params;
    //const user_id = req.user.id;
    const { start_date, end_date, expected_return_date, total }: Rent =
      req.body;

    if (!start_date || !end_date || !expected_return_date || !total) {
      throw new AppError("Preencha todos os campos");
    }

    return res.json();
  }
}

export { RentalsController };
