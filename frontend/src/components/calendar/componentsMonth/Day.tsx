import React from "react";
import dayjs from "dayjs";
interface IProps {
  day: dayjs.Dayjs;
  rowIdx: number;
}
const Day = ({ day, rowIdx }: IProps) => {
  return <div>{day}</div>;
};

export default Day;
