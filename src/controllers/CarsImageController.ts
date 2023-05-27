import { connection as knex } from "../database/knex";
import { Request, Response } from "express";
import { UserProps } from "../types/User";
import { AppError } from "../utils/AppError";

import { CarImage } from "../types/Car";
import { DiskStorage } from "../providers/DiskStorage";

class CarsImageController {
  async update(req: Request, res: Response) {
    const user_id = req.user.id;
    const { id } = req.params;
    const image_name = req.file?.filename;

    const user: UserProps = await knex("users").where({ id: user_id }).first();

    const diskStorage = new DiskStorage();

    if (!!user.is_admin === false) {
      throw new AppError("Usuário sem permissão");
    }

    if (!image_name) {
      throw new AppError("Insira uma imagem");
    }

    const car: CarImage = await knex("cars_image")
      .where({ car_id: id })
      .first();

    const filename = await diskStorage.saveFile(image_name);

    if (car && car.image_name) {
      await diskStorage.deleteFile(car.image_name);

      await knex("cars_image").where({ car_id: id }).update({
        image_name: filename,
      });
    } else {
      await knex("cars_image").insert({
        car_id: id,
        image_name: filename,
      });
    }

    return res.json({ message: "Foto atualizada" });
  }
}

export { CarsImageController };
