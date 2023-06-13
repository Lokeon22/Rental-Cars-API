import { connection as knex } from "../database/knex";
import { Request, Response } from "express";

import { UserRepository } from "../repositories/UserRepository";
import { UserCreateService } from "../services/UserCreateService";
import { UserUpdateService } from "../services/UserUpdateService";

import { UserProps } from "../types/User";

class UsersController {
  async create(req: Request, res: Response) {
    const { name, username, password, email, drive_license }: UserProps = req.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({ name, username, password, email, drive_license });

    return res.json({ message: "Usuario cadastrado" });
  }

  async show(req: Request, res: Response) {
    const allUsers: UserProps[] = await knex("users");

    return res.json(allUsers);
  }

  async update(req: Request, res: Response) {
    const { name, email, username, drive_license, newpassword, oldpassword } = req.body;

    const userRepository = new UserRepository();
    const userUpdateService = new UserUpdateService(userRepository);

    await userUpdateService.execute(
      { name, username, email, drive_license, newpassword, oldpassword },
      req
    );

    return res.json({ message: "Perfil atualizado" });
  }
}

export { UsersController };
