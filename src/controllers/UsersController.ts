import { connection as knex } from "../database/knex";
import { compare, hash } from "bcrypt";
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

  async update(req: Request, res: Response) {
    const user_id = req.user.id;
    const { name, email, username, drive_license, newpassword, oldpassword } =
      req.body;

    const user: UserProps = await knex("users").where({ id: user_id }).first();

    const verifyEmail: UserProps = await knex("users").where({ email }).first();

    if (verifyEmail && verifyEmail.id !== user_id) {
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
      await knex("users").where({ id: user_id }).update({
        password: new_pass_verify,
      });
    }

    await knex("users")
      .where({ id: user_id })
      .update({
        name: name ?? user.name,
        username: username ?? user.username,
        email: email ?? user.email,
        drive_license: drive_license ?? user.drive_license,
      });

    return res.json({ message: "Perfil atualizado" });
  }
}

export { UsersController };
