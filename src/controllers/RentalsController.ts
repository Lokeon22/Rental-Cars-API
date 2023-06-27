import { connection as knex } from "../database/knex";
import { Request, Response } from "express";
import { AppError } from "../utils/AppError";

import { Rent } from "../types/Rent";
import { Car } from "../types/Car";
import { UserProps } from "../types/User";

class RentalsController {
  async create(req: Request, res: Response) {
    const { car_id } = req.params;
    const user_id = req.user.id;
    const { start_date, end_date }: Rent = req.body;

    if (!start_date || !end_date) {
      throw new AppError("Preencha todos os campos");
    }

    const car: Car = await knex("cars").where({ id: car_id }).first();
    const rental_user: Rent = await knex("rentals").where({ user_id }).first();

    if (rental_user) {
      throw new AppError("Aluguel existente no seu nome");
    }

    if (!!car.available === false || car.fine_amount <= 0) {
      return new AppError("Carro indisponível no momento");
    }

    const get_day_start = new Date(start_date).getTime();
    const get_day_end = new Date(end_date).getTime();

    const calc_days = -(get_day_start - get_day_end);

    const total_days_rental = Math.ceil(calc_days / (1000 * 3600 * 24));

    const total_price = total_days_rental * car.daily_rate;

    await knex("rentals").insert({
      car_id,
      user_id,
      start_date,
      end_date,
      expected_return_date: end_date,
      total: total_price,
    });

    //admin_verify_amount
    await knex("cars")
      .where({ id: car_id })
      .update({
        fine_amount: car.fine_amount - 1,
      });

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
