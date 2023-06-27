import { Router } from "express";
import { RentalsController } from "../controllers/RentalsController";

const rentalsRouter = Router();

const rentalsController = new RentalsController();

import { ensureAuth } from "../middleware";

rentalsRouter.post("/rent/:car_id", ensureAuth, rentalsController.create);
rentalsRouter.get("/rents", ensureAuth, rentalsController.show);
rentalsRouter.get("/user/rents", ensureAuth, rentalsController.index);

export { rentalsRouter };
