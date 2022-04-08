/*
api/auth/
*/
import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import { createToken } from "../utils/createToken";

export const login = async (request: Request, response: Response) => {
  const body = {
    email: request.body.email.trim(),
    password: request.body.password.trim(),
  } as IUser;
  const user = await User.findOne({ email: body.email });
  const isMatchPassword = user && (await user?.comparePassword(body.password));
  if (isMatchPassword) {
    return response.status(200).json({
      ok: true,
      user: user,
      token: await createToken(user._id, user.email),
    });
  }
  response
    .status(404)
    .json({ ok: false, error: "email or password are invalited" });
};

export const authMe = async (request: Request, response: Response) => {
  const user = await User.findOne({ id: request.body.uid });
  return response.json({
    ok: true,
    msg: "se ha validado el token",
    user: user,
  });
};
