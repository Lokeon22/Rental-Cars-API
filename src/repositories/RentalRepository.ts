import { connection as knex } from "../database/knex";
import { Car } from "../types/Car";
import { Rent, RentCreateProps } from "../types/Rent";

class RentalRepository {
  async verifyCar(car_id: string) {
    const car: Car = await knex("cars").where({ id: car_id }).first();

    return car;
  }

  async verifyRentUser(user_id: number) {
    const rental_user: Rent = await knex("rentals").where({ user_id }).first();

    return rental_user;
  }

  async create({ car_id, user_id, start_date, end_date, total_price }: RentCreateProps) {
    const car = await this.verifyCar(car_id);

    const [create_rental] = await knex("rentals").insert({
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

    return { id: create_rental };
  }
}

export { RentalRepository };
