import { Router } from "express";
import { CarsController } from "../controllers/CarsController";
import { CarsImageController } from "../controllers/CarsImageController";

import { ensureAuth } from "../middleware";

const carsRoutes = Router();
const carsController = new CarsController();
const carsImageController = new CarsImageController();

carsRoutes.post("/create", ensureAuth, carsController.create);
carsRoutes.get("/cars", carsController.show);
carsRoutes.get("/car", carsController.index);
carsRoutes.put("/car/update/:id", ensureAuth, carsController.update);
carsRoutes.patch("/car/image/:id", ensureAuth, carsImageController.update);
carsRoutes.delete("/car/delete/:id", ensureAuth, carsController.delete);

export { carsRoutes };
