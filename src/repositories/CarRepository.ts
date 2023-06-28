import { connection as knex } from "../database/knex";
import { Car, CarImage, CarCategorie } from "../types/Car";
import { CarUpdateProps } from "../services/CarUpdateDeleteService";
import { UserProps } from "../types/User";

type CarCreate = Omit<Car, "id" | "created_at">;
export interface CarCreateProps extends CarCreate {
  user_id: number;
}

type CarFiltered = Pick<Car, "name" | "brand" | "license_plate">;

class CarRepository {
  async verifyCarExistByLicensePlate(license_plate: string) {
    const verifyCar: Car = await knex("cars").where({ license_plate }).first();

    return verifyCar;
  }

  async verifyUserExist(id: number) {
    const user: UserProps = await knex("users").where({ id }).first();

    return user;
  }

  async verifyCarExist(id: string) {
    const [car]: Car[] = await knex("cars").where({ id });

    return car;
  }

  async create({
    name,
    description,
    daily_rate,
    available,
    brand,
    license_plate,
    fine_amount,
    category_name,
    category_description,
  }: CarCreate) {
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
      car_id,
      category_name,
      category_description,
    });

    return { id: car_id };
  }

  async update({
    user_id,
    id,
    name,
    description,
    daily_rate,
    available,
    license_plate,
    fine_amount,
    brand,
    category_name,
    category_description,
  }: CarUpdateProps) {
    const [car]: Car[] = await knex("cars").where({ id });
    const [categorie]: CarCategorie[] = await knex("categories").where({
      car_id: id,
    });

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
      .where({ car_id: id })
      .update({
        category_name: category_name ?? categorie.category_name,
        category_description: category_description ?? categorie.category_description,
      });

    return { id: car.id };
  }

  async showCarDetails() {
    const cars: Car[] = await knex("cars");
    const images: CarImage[] = await knex("cars_image");
    const categories: CarCategorie[] = await knex("categories");

    return { cars, images, categories };
  }

  async showCarFiltered({ name, brand, license_plate }: CarFiltered) {
    const [car]: Car[] = await knex("cars")
      .whereLike("name", `%${name}%`)
      .whereLike("brand", `%${brand}%`)
      .whereLike("license_plate", `%${license_plate}%`)
      .innerJoin("categories", "categories.car_id", "cars.id");

    if (car) {
      const [carImage]: CarImage[] = await knex("cars_image").where({
        car_id: car.id,
      });

      return { car, carImage };
    }

    return { car };
  }

  async delete(id: string) {
    await knex("cars").where({ id }).delete();

    return { message: "Carro deletado" };
  }
}

export { CarRepository };
