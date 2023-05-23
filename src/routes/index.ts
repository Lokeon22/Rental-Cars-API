import { Router } from "express";
import { carsRoutes } from "./cars.routes";
import { rentalsRouter } from "./rentals.routes";

const routes = Router();

routes.use("/", carsRoutes);
routes.use("/", rentalsRouter);

export { routes };
