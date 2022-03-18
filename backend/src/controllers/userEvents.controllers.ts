//todas deben ser protegidas
import { Request, Response } from "express";
import Event from "../models/eventModel";
import { ObjectId } from "mongoose";
import { comparIdUsers } from "../utils/comparIdUsers";

interface IEventController {
  title: String;
  notes: string;
  dateStart: Date;
  dateEnd: Date;
  user_id: ObjectId;
  uid: ObjectId;
  email: string;
}

export const getEvents = async (req: Request, res: Response) => {
  const events = await Event.find({ user: req.params.user }).populate(
    "user",
    "name email"
  );
  res.json({
    ok: true,
    msg: "events of users",
    events,
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
  const event = {
    title: body.title,
    notes: body.notes,
    dateStart: body.dateStart,
    dateEnd: body.dateEnd,
    user: body.user_id,
  };
  try {
    await comparIdUsers(body.user_id, body.uid);
    const newEvent = new Event(event);
    const eventSave = await newEvent.save();
    return res.json({
      ok: true,
      msg: "event created",
      eventSave,
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
  const eventReq = {
    title: body.title,
    dateStart: body.dateStart,
    dateEnd: body.dateEnd,
    notes: body.notes,
  };

  try {
    const event = await Event.findOne({
      user: req.params.user,
      _id: req.params.id,
    });
    if (event) {
      const nuevoEvento = {
        ...eventReq,
        user: event?.user,
      };
      const eventUpdated = await Event.findByIdAndUpdate(
        event?.id,
        nuevoEvento,
        { new: true }
      );
      return res.json({
        ok: true,
        msg: "success updated event",
        eventUpdated,
      });
    } else {
      return res.status(404).json({
        ok: false,
        msg: "Hubo un error al actualizar, hable con el admi",
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
        eventDeleted,
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
