import { Router } from "express";

import { UsersController } from "../controllers/UsersController";

const usersRoutes = Router();
const usersController = new UsersController();

import { ensureAuth } from "../middleware";

usersRoutes.post("/register", usersController.create);
usersRoutes.get("/users", usersController.show);
usersRoutes.put("/user/update", ensureAuth, usersController.update);

export { usersRoutes };
