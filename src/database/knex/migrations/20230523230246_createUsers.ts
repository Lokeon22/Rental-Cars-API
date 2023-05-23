require("dotenv").config();
import { Knex } from "knex";
import { hash } from "bcrypt";

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable("users");
  const admin_pass = await hash(process.env.ADMIN_PASS as string, 8);

  if (!exists) {
    await knex.schema.createTable("users", (table) => {
      table.increments("id");
      table.text("name");
      table.text("username");
      table.text("password");
      table.text("email");
      table.text("drive_license");
      table.boolean("is_admin").defaultTo(0);
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });

    return await knex("users").insert({
      name: "Admin",
      username: "admin",
      password: admin_pass,
      email: "admin@admin.com",
      is_admin: true,
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
