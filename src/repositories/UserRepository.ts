import { connection as knex } from "../database/knex";
import { UserProps } from "../types/User";
import { Request } from "express";

export type UserCreate = Pick<
  UserProps,
  "name" | "username" | "password" | "email" | "drive_license"
>;

export type UserUpdate = {
  name: string;
  email: string;
  username: string;
  drive_license: string;
  newpassword?: string;
  oldpassword?: string;
};

class UserRepository {
  async verifyEmailExists(email: string) {
    const user: UserProps = await knex("users").where({ email }).first();

    return user;
  }

  async create({ name, username, password, email, drive_license }: UserCreate) {
    const [userId] = await knex("users").insert({
      name,
      username,
      password,
      email,
      drive_license,
    });

    return { id: userId };
  }

  async update(
    { name, email, username, drive_license, newpassword, oldpassword }: UserUpdate,
    req: Request,
    new_pass_verify?: string
  ) {
    const user_id = req.user.id;
    const user: UserProps = await knex("users").where({ id: user_id }).first();

    if (newpassword && oldpassword && new_pass_verify) {
      await knex("users").where({ id: user_id }).update({
        password: new_pass_verify,
      });
    }

    const user_updated = await knex("users")
      .where({ id: user_id })
      .update({
        name: name ?? user.name,
        username: username ?? user.username,
        email: email ?? user.email,
        drive_license: drive_license ?? user.drive_license,
      });

    return { id: user_updated };
  }
}

export { UserRepository };
