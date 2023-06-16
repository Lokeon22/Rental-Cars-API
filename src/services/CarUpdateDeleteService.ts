import { CarRepository } from "../repositories/CarRepository";
import { AppError } from "../utils/AppError";

import { Car } from "../types/Car";
type CarProps = Omit<Car, "created_at" | "id">;
export interface CarUpdateProps extends CarProps {
  id: string;
  user_id: number;
}

type DeleteProps = {
  id: string;
  user_id: number;
};

class CarUpdateDeleteService {
  carRepository;
  constructor(carRepository: CarRepository) {
    this.carRepository = carRepository;
  }

  async executeUpdate({
    user_id,
    id,
    name,
    description,
    available,
    brand,
    daily_rate,
    fine_amount,
    license_plate,
    category_name,
    category_description,
  }: CarUpdateProps) {
    const user = await this.carRepository.verifyUserExist(user_id);
    const car = await this.carRepository.verifyCarExist(id);

    if (!!user.is_admin === false) {
      throw new AppError("Usuário sem permissão");
    }

    if (!car) {
      throw new AppError("Carro não encontrado");
    }

    const updateCar = await this.carRepository.update({
      user_id,
      id,
      name,
      description,
      available,
      brand,
      daily_rate,
      fine_amount,
      license_plate,
      category_name,
      category_description,
    });

    return updateCar;
  }

  async executeDelete({ user_id, id }: DeleteProps) {
    const user = await this.carRepository.verifyUserExist(user_id);
    const car = await this.carRepository.verifyCarExist(id);

    if (!!user.is_admin === false) {
      throw new AppError("Usuário sem permissão");
    }

    if (!car) {
      throw new AppError("Carro não encontrado");
    }

    await this.carRepository.delete(id);
  }
}

export { CarUpdateDeleteService };
