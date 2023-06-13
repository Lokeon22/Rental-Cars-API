import { UserProps } from "../types/User";
import { UserCreate } from "./UserRepository";

class UserRepositoryInMemory {
  users: UserCreate[] = [];

  async create({ name, username, password, email, drive_license }: UserCreate) {
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      username,
      password,
      email,
      drive_license,
    };

    this.users.push(user);

    return user;
  }

  async verifyEmailExists(email: string) {
    return this.users.find((user) => user.email === email) as UserProps;
  }

  async update() {
    const id = 1;

    return { id };
  }
}

export { UserRepositoryInMemory };
