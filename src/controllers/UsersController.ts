import { connection as knex } from "../database/knex";
import { hash } from "bcrypt";
import { Request, Response } from "express";
import { AppError } from "../utils/AppError";

import { UserProps } from "../types/User";

class UsersController {
  async create(req: Request, res: Response) {
    const { name, username, password, email, drive_license }: UserProps =
      req.body;

    if (!name || !username || !password || !email || !drive_license) {
      throw new AppError("Preencha todos os campos");
    }

    const verifyEmail = await knex("users").where({ email }).first();

    if (verifyEmail) {
      throw new AppError("Email já existe");
    }

    const user_pass = await hash(password, 8);

    await knex("users").insert({
      name,
      username,
      password: user_pass,
      email,
      drive_license,
    });

    return res.json({ message: "Usuario cadastrado" });
  }

  async show(req: Request, res: Response) {
    const allUsers: UserProps[] = await knex("users");

    return res.json(allUsers);
  }
}

export { UsersController };
