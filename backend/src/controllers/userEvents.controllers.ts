//todas deben ser protegidas
import { Request, Response } from "express";
import Event from "../models/eventModel";
import { ObjectId } from "mongoose";
import { comparIdUsers } from "../utils/comparIdUsers";
import moment from "moment";

interface IEventController {
  title: String;
  description: string;
  start: Date;
  end: Date;
  user_id: ObjectId;
  email: string;
}

export const getEvents = async (req: Request, res: Response) => {
  const events = await Event.find({ user: req.params.user });
  console.log(req.query);
  let search = req.query.search || "";
  let sort: any = req.query.sort || "rating";

  sort ? (sort = sort.split(",")) : (sort = [sort]);

  let sortBy: any = {};
  if (sort[1]) {
    sortBy[sort[0]] = sort[1];
  } else {
    sortBy[sort[0]] = "asc";
  }
  const auxEvents = await Event.find({
    title: { $regex: search, $options: "i" },
    user: req.params.user,
  }).sort(sortBy);

  res.json({
    ok: true,
    msg: "User events",
    events: auxEvents,
  });
};
export const getEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findOne({
      user: req.params.user,
      _id: req.params.id,
    }).populate("user", "name email");
    if (event) {
      return res.json({
        ok: true,
        msg: "event get",
        event,
      });
    } else {
      return res.status(404).json({
        ok: false,
        msg: "No se encontro coincidencias",
        event,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Puede ser que Id no sea valido, Hable con el administrador",
    });
  }
};
export const postEvent = async (req: Request, res: Response) => {
  //crearEvento
  const body = req.body as IEventController;
  const event_sanitize = {
    title: body.title,
    description: body.description,
    start: body.start,
    end: body.end,
    user: body.user_id,
  };

  try {
    const startMoment = moment(event_sanitize.start);
    const endMoment = moment(event_sanitize.end);
    console.log(startMoment, endMoment);
    console.log(!startMoment.isSameOrAfter(endMoment));
    const newEvent = new Event(event_sanitize);
    const event = await newEvent.save();
    return res.json({
      ok: true,
      msg: "event created",
      event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hubo un error en la creación del evento, comuniquese con el administrador",
    });
  }
};
export const putEvent = async (req: Request, res: Response) => {
  const body = req.body as IEventController;
  const event_sanitize = {
    title: body.title,
    start: body.start,
    end: body.end,
    description: body.description,
  };

  try {
    const eventFind = await Event.findOne({
      user: req.params.user,
      _id: req.params.id,
    });
    if (eventFind) {
      const nuevoEvento = {
        ...event_sanitize,
        user: eventFind?.user,
      };
      const event = await Event.findByIdAndUpdate(eventFind?.id, nuevoEvento, {
        new: true,
      });
      return res.json({
        ok: true,
        msg: "success updated event",
        event,
      });
    } else {
      return res.status(404).json({
        ok: false,
        msg: "Hubo un error al actualizar, hable con el admi",
        event_sanitize,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Puede ser que Id no sea valido, Hable con el administrador",
    });
  }
};
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findOne({
      user: req.params.user,
      _id: req.params.id,
    });
    if (event == null) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontro el evento a eliminar",
        event,
      });
    }
    if (String(event.user) !== req.params.user) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de eliminar este evento",
      });
    }
    if (event) {
      const eventDeleted = await Event.findByIdAndDelete(event.id);
      return res.json({
        ok: true,
        msg: "success deleted event",
        event: eventDeleted,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Puede ser que Id no sea valido, Hable con el administrador",
    });
  }
};
