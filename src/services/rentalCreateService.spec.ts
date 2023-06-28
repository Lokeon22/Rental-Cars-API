import { RentalRepositoryInMemory } from "../repositories/RentalRepositoryInMemory";
import { RentalCreateService } from "./RentalCreateService";

describe("Create rentals to client", () => {
  it("Shoud be create a rental_car", async () => {
    const create_rental = {
      car_id: "2",
      user_id: 1,
      start_date: new Date(),
      end_date: new Date(),
      expected_return_date: "2023-07-07",
      total: 2000,
    };

    const rentalRepositoryInMemory = new RentalRepositoryInMemory();
    const rentalCreateService = new RentalCreateService(rentalRepositoryInMemory);

    const rents = await rentalCreateService.execute(create_rental);

    expect(rents).toHaveProperty("id");
  });
});
