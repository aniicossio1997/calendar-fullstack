import { Badge, Text, TextProps, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { prettyDateFull, prettyDateShort } from "../../../utils/formatDate";

interface IProps extends TextProps {
  title: string;
  date: Date;
}
const DatePrettySimple = ({ date, title, ...rest }: IProps) => {
  const [isLargerThan880] = useMediaQuery("(min-width: 880px)");

  return (
    <>
      <Text {...rest}>
        <Badge
          color={"gray.700"}
          fontWeight="light"
          textTransform={"capitalize"}
        >
          {title} :{" "}
          {isLargerThan880 ? prettyDateFull(date) : prettyDateShort(date)}
        </Badge>
      </Text>
    </>
  );
};

export default DatePrettySimple;
