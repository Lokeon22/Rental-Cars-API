import { Router } from "express";

import { SessionsController } from "../controllers/SessionsController";

const sessionsRoutes = Router();

const sessionsController = new SessionsController();

sessionsRoutes.post("/login", sessionsController.create);

export { sessionsRoutes };
