import { Router } from "express";
import { CarsController } from "../controllers/CarsController";
import { CarsImageController } from "../controllers/CarsImageController";

const carsRoutes = Router();
const carsController = new CarsController();
const carsImageController = new CarsImageController();

carsRoutes.post("/create", carsController.create);
carsRoutes.get("/cars", carsController.show);
carsRoutes.get("/car", carsController.index);
carsRoutes.put("/car/update/:id", carsController.update);
carsRoutes.patch("/car/image/:id", carsImageController.update);
carsRoutes.delete("/car/delete/:id", carsController.delete);

export { carsRoutes };
