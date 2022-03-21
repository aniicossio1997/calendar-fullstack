import { Badge, Box, Text } from "@chakra-ui/react";
import React from "react";
import { prettyDateFull } from "../../utils/formatDate";
interface IProps {
  date: Date;
  title: string;
}
const DatePrettyContainer = ({ date, title }: IProps) => {
  return (
    <>
      <Box>
        <Text color={"gray.500"} display="inline-block">
          {title}:
        </Text>
        <Badge color={"gray.700"} fontWeight="light">
          {prettyDateFull(date)}
        </Badge>
      </Box>
    </>
  );
};

export default DatePrettyContainer;
