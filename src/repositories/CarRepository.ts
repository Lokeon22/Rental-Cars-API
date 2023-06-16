import { connection as knex } from "../database/knex";
import { Car } from "../types/Car";
import { UserProps } from "../types/User";

type CarCreate = Omit<Car, "id" | "created_at">;
export interface CarCreateProps extends CarCreate {
  user_id: number;
}

class CarRepository {
  async verifyCarExistByLicensePlate(license_plate: string) {
    const verifyCar: Car = await knex("cars").where({ license_plate }).first();

    return verifyCar;
  }

  async verifyUserExist(id: number) {
    const user: UserProps = await knex("users").where({ id }).first();

    return user;
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
  }: CarCreateProps) {
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
}

export { CarRepository };
