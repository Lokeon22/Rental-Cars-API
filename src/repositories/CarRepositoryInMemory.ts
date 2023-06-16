import { CarCreateProps } from "./CarRepository";
import { Car } from "../types/Car";
import { UserProps } from "../types/User";

type CarMemoryProps = Omit<CarCreateProps, "user_id">;

class CarRepositoryInMemory {
  car_id: CarMemoryProps[] = [];

  async verifyCarExistByLicensePlate(license_plate: string) {
    return this.car_id.find((car) => car.license_plate === license_plate) as Car;
  }

  async verifyUserExist(id: number) {
    const user: UserProps = {
      id: Math.floor(Math.random() * 1000) + 1,
      name: "test",
      username: "t",
      email: "test@test.com",
      is_admin: true,
      password: "123",
      drive_license: "b",
      created_at: new Date(),
    };

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
  }: CarMemoryProps) {
    const car = {
      name,
      description,
      daily_rate,
      available,
      brand,
      license_plate,
      fine_amount,
      category_name,
      category_description,
    };

    this.car_id.push(car);

    return { id: car.fine_amount };
  }
}

export { CarRepositoryInMemory };
