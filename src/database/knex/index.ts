const config = require("../../../knexfile");
import knex from "knex";

const connection = knex(config.development);

export { connection };
