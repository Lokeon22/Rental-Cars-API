import { CarCreateProps } from "./CarRepository";
import { Car, CarCategorie, CarImage } from "../types/Car";
import { UserProps } from "../types/User";

type CarMemoryProps = Omit<CarCreateProps, "user_id">;
type CarFilteredProps = Pick<CarCreateProps, "name" | "brand" | "license_plate">;

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

  async verifyCarExist(id: string) {
    const car: Car = {
      id: Math.floor(Math.random() * 1000) + 1,
      name: "Car test",
      description: "car 1.0",
      daily_rate: 250,
      available: true,
      license_plate: "ABCD-1234",
      fine_amount: 3,
      brand: "LK_TEST",
      category_name: "Compact",
      category_description: "test_desc",
      created_at: new Date(),
    };

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

  async update() {
    const id = 1;

    return { id };
  }

  async showCarDetails() {
    const cars: Car[] = [
      {
        id: Math.floor(Math.random() * 1000) + 1,
        name: "Car test",
        description: "car 1.0",
        daily_rate: 250,
        available: true,
        license_plate: "ABCD-1234",
        fine_amount: 3,
        brand: "LK_TEST",
        category_name: "Compact",
        category_description: "test_desc",
        created_at: new Date(),
      },
    ];

    const images: CarImage[] = [];
    const categories: CarCategorie[] = [];

    return { cars, images, categories };
  }

  async showCarFiltered({ name, brand, license_plate }: CarFilteredProps) {
    const car_test: Car[] = [];

    const car = car_test.find(
      (car) => car.name || car.brand || car.license_plate === name || brand || license_plate
    ) as Car;

    if (car) {
      const [carImage]: CarImage[] = [];

      return { car, carImage: carImage ?? [] };
    }

    return { car };
  }

  async delete() {
    const message = "Carro deletado com sucesso";

    return { message };
  }
}

export { CarRepositoryInMemory };
