//routes protegidas por el token jwt

import { Router } from "express";
import * as Controller from "../controllers/events.controllers";
import { validateToken } from "../middlewares/validateToken";
import { check } from "express-validator";
import { validate } from "../middlewares/validate";
import { isValidDate } from "../utils/isValidDate";

const routerEvents = Router();
routerEvents.get("/", Controller.getAll);

export default routerEvents;
