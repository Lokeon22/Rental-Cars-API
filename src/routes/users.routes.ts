import { Router } from "express";

import { UsersController } from "../controllers/UsersController";

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/register", usersController.create);
usersRoutes.get("/users", usersController.show);

export { usersRoutes };
