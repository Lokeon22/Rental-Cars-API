import { hash } from "bcrypt";
import { UserCreate, UserRepository } from "../repositories/UserRepository";
import { AppError } from "../utils/AppError";

class UserCreateService {
  userRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, username, email, password, drive_license }: UserCreate) {
    if (!name || !username || !password || !email || !drive_license) {
      throw new AppError("Preencha todos os campos");
    }

    const verifyEmail = await this.userRepository.verifyEmailExists(email);

    if (verifyEmail) {
      throw new AppError("Email já existe");
    }

    const user_pass = await hash(password, 8);

    const userCreated = await this.userRepository.create({
      name,
      username,
      email,
      password: user_pass,
      drive_license,
    });

    return userCreated;
  }
}

export { UserCreateService };
