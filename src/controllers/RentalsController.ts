import { connection as knex } from "../database/knex";
import { Request, Response } from "express";
import { AppError } from "../utils/AppError";

import { RentalRepository } from "../repositories/RentalRepository";
import { RentalCreateService } from "../services/RentalCreateService";

import { Rent } from "../types/Rent";
import { UserProps } from "../types/User";

class RentalsController {
  async create(req: Request, res: Response) {
    const { car_id } = req.params;
    const user_id = req.user.id;
    const { start_date, end_date }: Rent = req.body;

    const rentalRepository = new RentalRepository();
    const rentalCreateService = new RentalCreateService(rentalRepository);

    await rentalCreateService.execute({ car_id, user_id, start_date, end_date });

    return res.json({ message: "Carro alugado. Obrigado!" });
  }

  async show(req: Request, res: Response) {
    const user_id = req.user.id;

    const user: UserProps = await knex("users").where({ id: user_id }).first();

    if (!!user.is_admin === false) {
      throw new AppError("Usuário sem permissão");
    }

    const allrents: Rent[] = await knex("rentals");

    return res.json(allrents);
  }

  async index(req: Request, res: Response) {
    const user_id = req.user.id;

    const rents: Rent = await knex("rentals").where({ user_id }).first();

    if (!rents) {
      return res.json(false);
    }

    return res.json(rents);
  }
}

export { RentalsController };
