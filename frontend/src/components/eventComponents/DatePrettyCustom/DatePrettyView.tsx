import { Badge } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { prettyDateFull } from "../../../utils/formatDate";
import { DatePrettyContext } from "./DatePretty";
interface IProps {
  date: Date;
}
export const DatePrettyView = ({ date }: IProps) => {
  const { datePretty } = useContext(DatePrettyContext);
  const [value, setValue] = useState<Date | "">("");
  useEffect(() => {
    if (date) {
      setValue(date);
    } else {
      setValue(datePretty.date);
    }
    return () => {
      setValue("");
    };
  }, []);

  return (
    <>
      <Badge color={"gray.700"} fontWeight="light" textTransform={"capitalize"}>
        {prettyDateFull(datePretty.date)}
      </Badge>
    </>
  );
};
