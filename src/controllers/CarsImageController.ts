import { connection as knex } from "../database/knex";
import { Request, Response } from "express";

class CarsImageController {
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { image_name } = req.body;

    const car = await knex("cars_image").where({ car_id: id }).first();

    car
      ? await knex("cars_image").where({car_id: id}).update({
          image_name: image_name ?? car.image_name,
        })
      : await knex("cars_image").insert({
          car_id: id,
          image_name,
        });

    return res.json({ message: "Foto atualizada" });
  }
}

export { CarsImageController };
