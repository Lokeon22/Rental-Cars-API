import { UserRepository, UserUpdate } from "../repositories/UserRepository";
import { Request } from "express";
import { compare, hash } from "bcrypt";
import { AppError } from "../utils/AppError";

class UserUpdateService {
  userRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async execute(
    { name, username, email, drive_license, newpassword, oldpassword }: UserUpdate,
    req: Request
  ) {
    const user_id = req.user.id;

    if (!email) {
      throw new AppError("Preencha seu email");
    }

    const user = await this.userRepository.verifyEmailExists(email);

    if (user && user.id !== user_id) {
      throw new AppError("Esse email já existe");
    }

    if (newpassword && !oldpassword) {
      throw new AppError("Favor informar a senha antiga");
    }

    if (newpassword && oldpassword) {
      const verifyPass = await compare(oldpassword, user.password);

      if (!!verifyPass === false) {
        throw new AppError("Senha incorreta");
      }

      const new_pass_verify = await hash(newpassword, 8);
      const update_pass = await this.userRepository.update(
        { name, email, username, drive_license, newpassword, oldpassword },
        req,
        new_pass_verify
      );

      return update_pass;
    }

    const user_updated = this.userRepository.update({ name, email, username, drive_license }, req);

    return user_updated;
  }
}

export { UserUpdateService };
