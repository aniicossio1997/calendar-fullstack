import { Request } from "express";
import { CustomValidator } from "express-validator";
import moment from "moment";
export const isValidDate: CustomValidator = (value): Boolean => {
  console.log("con parse: ", Date.parse(value));
  console.log("sin parse: ", value);
  const date = Date.parse(value);
  if (!date) {
    return false;
  }
  if (moment(+date).isValid()) {
    return true;
  } else {
    return false;
  }
};
