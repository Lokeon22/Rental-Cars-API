import { Car } from "../types/Car";
import { Rent } from "../types/Rent";

interface CreateProps {
  car_id: string;
  user_id: number;
  start_date: Date;
  end_date: Date;
  total_price: number;
}

class RentalRepositoryInMemory {
  rental: CreateProps[] = [];

  async verifyCar(car_id: string) {
    const car: Car = {
      id: 1,
      name: "test",
      description: "test2",
      available: true,
      brand: "Test",
      category_description: "T",
      category_name: "T",
      fine_amount: 1,
      license_plate: "123",
      created_at: new Date(),
      daily_rate: 1,
    };

    return car;
  }

  async verifyRentUser(user_id: number) {
    const [rental_user]: Rent[] = [];

    return rental_user;
  }

  async create({ car_id, user_id, start_date, end_date, total_price }: CreateProps) {
    const rent = {
      car_id,
      user_id,
      start_date,
      end_date,
      total_price,
    };

    this.rental.push(rent);

    return { id: rent.user_id };
  }
}

export { RentalRepositoryInMemory };
