import { Router } from "express";
import { CarsController } from "../controllers/CarsController";

const carsRoutes = Router();
const carsController = new CarsController();

carsRoutes.get("/create", carsController.create);

export { carsRoutes };
