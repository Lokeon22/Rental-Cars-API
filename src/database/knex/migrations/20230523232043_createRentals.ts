import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("rentals", (table) => {
    table.increments("id");
    table.integer("car_id").references("id").inTable("cars");
    table.integer("user_id").references("id").inTable("users");
    table.date("start_date");
    table.date("end_date");
    table.date("expected_return_date");
    table.decimal("total", 10, 2);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("rentals");
}
