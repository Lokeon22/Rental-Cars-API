import { connection as knex } from "../database/knex";
import { Request, Response } from "express";
import { AppError } from "../utils/AppError";

import { Car, CarImage } from "../types/Car";
import { UserProps } from "../types/User";

type CarCategorie = Pick<Car, "id" | "name" | "description" | "created_at">;

class CarsController {
  async create(req: Request, res: Response) {
    const id = req.user.id;

    const {
      name,
      description,
      daily_rate,
      available,
      license_plate,
      fine_amount,
      brand,
      category_name,
      category_description,
    }: Car = req.body;

    const user: UserProps = await knex("users").where({ id }).first();

    if (!!user.is_admin === false) {
      throw new AppError("Usuário sem permissão");
    }

    if (
      !name ||
      !daily_rate ||
      !available ||
      !license_plate ||
      !brand ||
      !category_name ||
      !category_description
    ) {
      throw new AppError("Preencha todos os campos");
    }

    const verifyCar = await knex("cars").where({ license_plate }).first();

    if (verifyCar) {
      throw new AppError("Carro já adicionado");
    }

    const [car_id] = await knex("cars").insert({
      name,
      description,
      daily_rate,
      available,
      license_plate,
      fine_amount,
      brand,
    });

    await knex("categories").insert({
      id: car_id,
      name: category_name,
      description: category_description,
    });

    return res.json({ message: "Carro adicionado no sistema" });
  }

  async show(req: Request, res: Response) {
    const cars: Car[] = await knex("cars");
    const images: CarImage[] = await knex("cars_image");
    const categories: CarCategorie[] = await knex("categories");

    const carsWithProps = cars.map((car) => {
      let filtered_image = images.filter((image) => image.car_id === car.id);

      let [filtered_categorie] = categories.filter(
        (categorie) => categorie.id === car.id
      );

      return {
        ...car,
        image: filtered_image ?? [],
        category: filtered_categorie,
      };
    });

    return res.json(carsWithProps);
  }

  async index(req: Request, res: Response) {
    const { name, brand, license_plate } = req.query;

    const [car]: Car[] = await knex("cars")
      .whereLike("name", `%${name}%`)
      .whereLike("brand", `%${brand}%`)
      .whereLike("license_plate", `%${license_plate}%`);

    if (!car) {
      return res.json({ message: "Nenhum carro encontrado" });
    }

    const image: CarImage[] = await knex("cars_image").where({
      car_id: car.id,
    });

    const [category]: CarCategorie[] = await knex("categories").where({
      id: car.id,
    });

    return res.json({ car, image: image ?? [], category });
  }

  async update(req: Request, res: Response) {
    const user_id = req.user.id;
    const { id } = req.params;

    const {
      name,
      description,
      daily_rate,
      available,
      license_plate,
      fine_amount,
      brand,
      category_name,
      category_description,
    }: Car = req.body;

    const user: UserProps = await knex("users").where({ id: user_id }).first();

    if (!!user.is_admin === false) {
      throw new AppError("Usuário sem permissão");
    }

    const [car]: Car[] = await knex("cars").where({ id });

    const [categorie]: CarCategorie[] = await knex("categories").where({ id });

    if (!car) {
      throw new AppError("Carro não encontrado");
    }

    await knex("cars")
      .where({ id })
      .update({
        name: name ?? car.name,
        description: description ?? car.description,
        daily_rate: daily_rate ?? car.daily_rate,
        available: available ?? car.available,
        license_plate: license_plate ?? car.license_plate,
        fine_amount: fine_amount ?? car.fine_amount,
        brand: brand ?? car.brand,
      });

    await knex("categories")
      .where({ id })
      .update({
        name: category_name ?? categorie.name,
        description: category_description ?? categorie.description,
      });

    return res.json({ message: "Carro atualizado" });
  }

  async delete(req: Request, res: Response) {
    const user_id = req.user.id;
    const { id } = req.params;

    const user: UserProps = await knex("users").where({ id: user_id }).first();

    if (!!user.is_admin === false) {
      throw new AppError("Usuário sem permissão");
    }

    const car = await knex("cars").where({ id }).first();

    if (!car) {
      throw new AppError("Carro não encontrado");
    }

    await knex("cars").where({ id }).delete();

    return res.json({ message: "Carro deletado do sistema" });
  }
}

export { CarsController };
