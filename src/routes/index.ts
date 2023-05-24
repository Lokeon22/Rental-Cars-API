import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { carsRoutes } from "./cars.routes";
import { rentalsRouter } from "./rentals.routes";

const routes = Router();

routes.use("/", usersRoutes);
routes.use("/", carsRoutes);
routes.use("/", rentalsRouter);

export { routes };
