import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { carsRoutes } from "./cars.routes";
import { rentalsRouter } from "./rentals.routes";
import { sessionsRoutes } from "./sessions.routes";

const routes = Router();

routes.use("/", usersRoutes);
routes.use("/", carsRoutes);
routes.use("/", rentalsRouter);
routes.use("/", sessionsRoutes);

export { routes };
