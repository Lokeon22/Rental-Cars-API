import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("cars_image", (table) => {
    table.increments("id");
    table.integer("car_id").references("id").inTable("cars");
    table.text("image_name").defaultTo(null);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("cars_image");
}
