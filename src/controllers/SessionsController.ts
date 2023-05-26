import { connection as knex } from "../database/knex";
import { Request, Response } from "express";
import { compare } from "bcrypt";

import { authConfigs } from "../configs/auth";
import { sign } from "jsonwebtoken";

import { AppError } from "../utils/AppError";
import { UserProps } from "../types/User";

class SessionsController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const user: UserProps = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("Email e/ou senha incorretos");
    }

    const verifyPass = await compare(password, user.password);

    if (!verifyPass) {
      throw new AppError("Email e/ou senha incorretos");
    }

    const { secret, expiresIn } = authConfigs.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return res.json({ user, token });
  }
}

export { SessionsController };
