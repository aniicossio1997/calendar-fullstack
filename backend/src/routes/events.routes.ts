//routes protegidas por el token jwt

import { Router } from "express";
import * as Controller from "../controllers/events.controllers";
import { validateToken } from "../middlewares/validateToken";
import { check } from "express-validator";
import { validate } from "../middlewares/validate";
import { isValidDate } from "../utils/isValidDate";

const routerEvents = Router();
routerEvents.get("/all", Controller.getAll);
//para validar todos los token
routerEvents.use(validateToken);
routerEvents.get("/", Controller.getEvents);

routerEvents.post(
  "/",
  [
    check("title", "El titulo es obligatorio").notEmpty(),
    check(
      "start",
      "La fecha de inicio es obligatoria y debe de ser valida"
    ).custom(isValidDate),
    check("end", "La fecha de fin es obligatoria y debe ser valida").custom(
      isValidDate
    ),
    check("user_id", "el id de usuario debe de ser obligatorio").notEmpty(),
    validate,
  ],

  Controller.postEvent
);

routerEvents.get("/:id", Controller.getEvent);
routerEvents.put("/:id", Controller.putEvent);
routerEvents.delete(":/", Controller.deleteEvent);
export default routerEvents;
