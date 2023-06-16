import { CarRepository } from "../repositories/CarRepository";
import { AppError } from "../utils/AppError";

class CarDetailsService {
  carRepository;
  constructor(carRepository: CarRepository) {
    this.carRepository = carRepository;
  }

  async executeAll() {
    const { cars, images, categories } = await this.carRepository.showCarDetails();

    const carsWithProps = cars.map((car) => {
      let filtered_image = images.filter((image) => image.car_id === car.id);

      let [filtered_categorie] = categories.filter((categorie) => categorie.car_id === car.id);

      return {
        ...car,
        image: filtered_image ?? [],
        category: filtered_categorie,
      };
    });

    return { carsWithProps };
  }

  async executeFiltered({
    name,
    brand,
    license_plate,
  }: string | string[] | any | any[] | undefined) {
    const { car, carImage } = await this.carRepository.showCarFiltered({
      name,
      brand,
      license_plate,
    });

    if (!car) {
      throw new AppError("Nenhum carro encontrado");
    }

    return { car, carImage };
  }
}

export { CarDetailsService };
