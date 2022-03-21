import moment from "moment";
export const prettyDateFull = (date: Date) => {
  return moment(date).format("DD/MM/YYYY H:mm a");
};
