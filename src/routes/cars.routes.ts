import { Router } from "express";
import multer from "multer";

import { CarsController } from "../controllers/CarsController";
import { CarsImageController } from "../controllers/CarsImageController";
import { MULTER } from "../configs/upload";

import { ensureAuth } from "../middleware";
const upload = multer(MULTER);

const carsRoutes = Router();
const carsController = new CarsController();
const carsImageController = new CarsImageController();

carsRoutes.post("/create", ensureAuth, carsController.create);
carsRoutes.get("/cars", carsController.show);
carsRoutes.get("/car", carsController.index);
carsRoutes.put("/car/update/:id", ensureAuth, carsController.update);
carsRoutes.patch(
  "/car/image/:id",
  ensureAuth,
  upload.single("image_name"),
  carsImageController.update
);
carsRoutes.delete("/car/delete/:id", ensureAuth, carsController.delete);

export { carsRoutes };
