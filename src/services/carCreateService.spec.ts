import { CarRepositoryInMemory } from "../repositories/CarRepositoryInMemory";
import { AppError } from "../utils/AppError";
import { CarCreateService } from "./CarCreateService";

describe("Create cars or reject", () => {
  let carRepositoryInMemory: CarRepositoryInMemory;
  let carCreateService: CarCreateService;

  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    carCreateService = new CarCreateService(carRepositoryInMemory);
  });

  it("Should be create a new_car to rent", async () => {
    const car_test = {
      user_id: 1,
      name: "Car test",
      description: "car 1.0",
      daily_rate: 250,
      available: true,
      license_plate: "ABCD-1234",
      fine_amount: 3,
      brand: "LK_TEST",
      category_name: "Compact",
      category_description: "test_desc",
    };

    const create_car = await carCreateService.execute(car_test);

    expect(create_car).toHaveProperty("id");
  });

  it("If exists license_plate, return error", async () => {
    const car_test1 = {
      user_id: 1,
      name: "Car test",
      description: "car 1.0",
      daily_rate: 250,
      available: true,
      license_plate: "ABCD-1234",
      fine_amount: 3,
      brand: "LK_TEST",
      category_name: "Compact",
      category_description: "test_desc",
    };

    const car_test2 = {
      user_id: 1,
      name: "Car test",
      description: "car 1.0",
      daily_rate: 250,
      available: true,
      license_plate: "ABCD-1234",
      fine_amount: 3,
      brand: "LK_TEST",
      category_name: "Compact",
      category_description: "test_desc",
    };

    await carCreateService.execute(car_test1);
    await expect(carCreateService.execute(car_test2)).rejects.toEqual(
      new AppError("Carro já adicionado")
    );
  });
});
