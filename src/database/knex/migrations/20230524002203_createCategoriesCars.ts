import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("categories", (table) => {
    table
      .integer("car_id")
      .references("id")
      .inTable("cars")
      .onDelete("CASCADE");
    table.text("category_name");
    table.text("category_description");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("categories");
}
