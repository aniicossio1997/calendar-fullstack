/*
api/auth/
*/
import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import { createToken } from "../utils/createToken";
import jwt from "jsonwebtoken";
import config from "../config/config";

interface IVerify {
  id: string;
  email: string;
  iat: number;
  exp: number;
}
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

export const authMe = async (req: Request, response: Response) => {
  // console.log("Request: ", request.body);
  // const user = await User.findOne({ id: request.body.id });
  // return response.json({
  //   ok: true,
  //   msg: "se ha validado el token",
  //   user: user,
  // });
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader?.includes("Bearer")) {
    return response.status(401).json({
      ok: false,
      msg: "UPS el header nececita la palabra clave Bearer o el no hay token para validar",
    });
  }
  const token = authHeader && authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, config.jwtSecret) as IVerify;
    const auxUser = {
      id: payload.id,
      email: payload.email,
    } as IUser;
    console.log("PAYPOAD VALIDATE", payload);
    const user = await User.findOne({ email: auxUser.email });
    console.log("PAYLOAD ID:", payload.id.toString());

    return response.status(200).json({
      ok: true,
      msg: "se ha validado el token",
      user: {
        id: payload.id.toString(),
        email: payload.email,
        name: user?.name,
      },
    });
  } catch (error) {
    return response.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
};
