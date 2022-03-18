//todas deben ser protegidas
import { Request, Response } from "express";
import { Schema } from "express-validator";
import Event, { IEvent } from "../models/eventModel";
import { ObjectId } from "mongoose";
import moment from "moment";
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
export const getAll = (req: Request, res: Response) => {
  res.json({
    ok: true,
    msg: "All events",
  });
};
export const getEvents = async (req: Request, res: Response) => {
  const events = await Event.find().populate("user", "name email");
  res.json({
    ok: true,
    msg: "events",
    events,
  });
};
export const getEvent = (req: Request, res: Response) => {
  res.json({
    ok: true,
    msg: "event get",
  });
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
export const putEvent = (req: Request, res: Response) => {
  res.json({
    ok: true,
    msg: "event updated",
  });
};
export const deleteEvent = (req: Request, res: Response) => {
  res.json({
    ok: true,
    msg: "event deleted",
  });
};
