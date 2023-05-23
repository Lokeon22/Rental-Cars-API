import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table) => {
    table.increments("id");
    table.text("name");
    table.text("description");
    table.integer("daily_rate");
    table.boolean("available");
    table.text("license_plate");
    table.integer("fine_amount");
    table.text("brand");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars");
}
