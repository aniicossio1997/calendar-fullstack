import { Input } from "@chakra-ui/react";
type typeInput = "text" | "password" | "email";
interface IDataInputUser {
  name: string;
  type: typeof Input;
}
export const dataInputUser = [];
