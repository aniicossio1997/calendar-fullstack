import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/useModel";

export const getUsers = async (request: Request, response: Response) => {
  try {
    const users = await User.find();
    return response.json({ ok: true, data: { users } });
  } catch (error) {
    console.log(error);
    response.status(404).json({
      ok: false,
      msg: "error",
    });
  }
};
export const getUser = async (request: Request, response: Response) => {
  const { id } = request.params;

  try {
    const user = await User.findOne({ _id: id });
    return response.json({ ok: true, user });
  } catch (error) {
    response
      .status(404)
      .json({ ok: false, errors: { msg: "error user Not found" } });
  }
};
export const postUser = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response> => {
  //crear user
  const body = {
    name: request.body.name.trim(),
    email: request.body.email.trim(),
    password: request.body.password.trim(),
  } as IUser;
  const user = await User.findOne({ email: body.email });
  if (user) {
    return response
      .status(400)
      .json({
        ok: false,
        errors: { msg: "Ya existe un usuario con ese email" },
      });
  }
  try {
    const newUser = new User(body);
    await newUser.save();
    return response.status(201).json({ ok: true, user: newUser });
  } catch (error) {
    return response.status(500).json({
      ok: false,
      errors: { msg: "Hable con el administrador" },
    });
  }
};

export const putUser = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { body } = request;
  response.json({
    message: "putUser",
    body,
    id,
  });
};
export const deleteUser = async (request: Request, response: Response) => {
  const { id } = request.params;
  response.json({
    message: "deleteUser",
  });
};
