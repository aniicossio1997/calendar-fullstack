import dotenv from "dotenv";
import { dbConnection } from "./database";
import Server from "./server/server";
//confi dotenv
dotenv.config();
dbConnection();
const server = new Server();
server.listen();
