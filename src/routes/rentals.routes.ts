import { Router } from "express";
import { RentalsController } from "../controllers/RentalsController";

const rentalsRouter = Router();

const rentalsController = new RentalsController();

rentalsRouter.use("/rental", rentalsController.create);

export { rentalsRouter };
