import { CarRepository, CarCreateProps } from "../repositories/CarRepository";
import { AppError } from "../utils/AppError";

class CarCreateService {
  carRepository;
  constructor(carRepository: CarRepository) {
    this.carRepository = carRepository;
  }

  async execute({
    user_id,
    name,
    description,
    daily_rate,
    available,
    fine_amount,
    brand,
    category_name,
    category_description,
    license_plate,
  }: CarCreateProps) {
    const user = await this.carRepository.verifyUserExist(user_id);
    const car = await this.carRepository.verifyCarExistByLicensePlate(license_plate);

    if (
      !name ||
      !daily_rate ||
      !license_plate ||
      !brand ||
      !category_name ||
      !category_description
    ) {
      throw new AppError("Preencha todos os campos");
    }

    if (!!user.is_admin === false) {
      throw new AppError("Usuário sem permissão");
    }

    if (car) {
      throw new AppError("Carro já adicionado");
    }

    const create_car = await this.carRepository.create({
      name,
      description,
      daily_rate,
      available,
      brand,
      license_plate,
      fine_amount,
      category_name,
      category_description,
      user_id,
    });

    return { id: create_car };
  }
}

export { CarCreateService };
