import { Router } from "express";
import { RentalsController } from "../controllers/RentalsController";

const rentalsRouter = Router();

const rentalsController = new RentalsController();

rentalsRouter.get("/rent/:id", rentalsController.create);

export { rentalsRouter };
