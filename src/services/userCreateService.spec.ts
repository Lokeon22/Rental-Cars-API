import { UserCreateService } from "./UserCreateService";
import { UserRepositoryInMemory } from "../repositories/UserRepositoryInMemory";
import { UserCreate } from "../repositories/UserRepository";

import { AppError } from "../utils/AppError";

describe("Create user", () => {
  let userRepositoryInMemory: UserRepositoryInMemory;
  let userCreateService: UserCreateService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
  });

  it("User should be create", async () => {
    const userData: UserCreate = {
      name: "User test",
      username: "teste",
      email: "user@test.com",
      password: "123",
      drive_license: "B",
    };

    const userCreated = await userCreateService.execute(userData);

    expect(userCreated).toHaveProperty("id");
  });

  it("If email exists, reject user", async () => {
    const user1: UserCreate = {
      name: "test1",
      email: "user@test.com",
      password: "123",
      username: "t1",
      drive_license: "B",
    };

    const user2: UserCreate = {
      name: "test2",
      email: "user@test.com",
      password: "456",
      username: "t2",
      drive_license: "B",
    };

    await userCreateService.execute(user1);
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Email já existe"));
  });
});
