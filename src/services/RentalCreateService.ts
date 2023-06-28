import { RentalRepository } from "../repositories/RentalRepository";
import { AppError } from "../utils/AppError";

interface ExecuteProps {
  car_id: string;
  user_id: number;
  start_date: Date;
  end_date: Date;
}

class RentalCreateService {
  rentalRepository;
  constructor(rentalRepository: RentalRepository) {
    this.rentalRepository = rentalRepository;
  }

  async execute({ car_id, user_id, start_date, end_date }: ExecuteProps) {
    if (!start_date || !end_date) {
      throw new AppError("Preencha todos os campos");
    }

    const rental_user = await this.rentalRepository.verifyRentUser(user_id);
    const car = await this.rentalRepository.verifyCar(car_id);

    if (rental_user) {
      throw new AppError("Aluguel existente no seu nome");
    }

    if (!!car.available === false || car.fine_amount <= 0) {
      throw new AppError("Carro indisponível no momento");
    }

    const get_day_start = new Date(start_date).getTime();
    const get_day_end = new Date(end_date).getTime();

    const calc_days = -(get_day_start - get_day_end);

    const total_days_rental = Math.ceil(calc_days / (1000 * 3600 * 24));

    const total_price = total_days_rental * car.daily_rate;

    const create_rental = await this.rentalRepository.create({
      car_id,
      start_date,
      end_date,
      user_id,
      total_price,
    });

    return create_rental;
  }
}

export { RentalCreateService };
