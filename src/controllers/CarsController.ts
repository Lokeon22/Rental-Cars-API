import { Request, Response } from "express";

import { CarRepository } from "../repositories/CarRepository";
import { CarCreateService } from "../services/CarCreateService";
import { CarUpdateDeleteService } from "../services/CarUpdateDeleteService";

import { Car } from "../types/Car";
import { CarDetailsService } from "../services/CarDetailsService";

class CarsController {
  async create(req: Request, res: Response) {
    const id = req.user.id;

    const {
      name,
      description,
      daily_rate,
      available,
      license_plate,
      fine_amount,
      brand,
      category_name,
      category_description,
    }: Car = req.body;

    const carRepository = new CarRepository();
    const carCreateService = new CarCreateService(carRepository);

    await carCreateService.execute({
      user_id: id,
      name,
      description,
      daily_rate,
      available,
      license_plate,
      fine_amount,
      brand,
      category_name,
      category_description,
    });

    return res.json({ message: "Carro adicionado no sistema" });
  }

  async show(req: Request, res: Response) {
    const carRepository = new CarRepository();
    const carShowService = new CarDetailsService(carRepository);

    const { carsWithProps } = await carShowService.executeAll();

    return res.json(carsWithProps);
  }

  async index(req: Request, res: Response) {
    const { name, brand, license_plate } = req.query;

    const carRepository = new CarRepository();
    const carShowService = new CarDetailsService(carRepository);

    const { car, carImage } = await carShowService.executeFiltered({ name, brand, license_plate });

    return res.json({ car, carImage: carImage ?? [] });
  }

  async update(req: Request, res: Response) {
    const user_id = req.user.id;
    const { id } = req.params;

    const {
      name,
      description,
      daily_rate,
      available,
      license_plate,
      fine_amount,
      brand,
      category_name,
      category_description,
    }: Car = req.body;

    const carRepository = new CarRepository();
    const carUpdateDeleteService = new CarUpdateDeleteService(carRepository);

    await carUpdateDeleteService.executeUpdate({
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
    });

    return res.json({ message: "Carro atualizado" });
  }

  async delete(req: Request, res: Response) {
    const user_id = req.user.id;
    const { id } = req.params;

    const carRepository = new CarRepository();
    const carUpdateDeleteService = new CarUpdateDeleteService(carRepository);

    await carUpdateDeleteService.executeDelete({ user_id, id });

    return res.json({ message: "Carro deletado do sistema" });
  }
}

export { CarsController };
