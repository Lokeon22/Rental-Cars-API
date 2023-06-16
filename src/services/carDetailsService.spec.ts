import { CarDetailsService } from "./CarDetailsService";
import { CarRepositoryInMemory } from "../repositories/CarRepositoryInMemory";
import { AppError } from "../utils/AppError";

describe("Show cars and filter", () => {
  let carRepositoryInMemory: CarRepositoryInMemory;
  let carDetailsService: CarDetailsService;

  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    carDetailsService = new CarDetailsService(carRepositoryInMemory);
  });

  it("Should be return error on search if not exists car", async () => {
    const search_car = {
      name: "t",
      brand: "test",
      license_plate: "XXXX-0000",
    };

    await expect(carDetailsService.executeFiltered(search_car)).rejects.toEqual(
      new AppError("Nenhum carro encontrado")
    );
  });
});
