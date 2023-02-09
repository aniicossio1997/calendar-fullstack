import {
  Box,
  Button,
  Container,
  Icon,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { MdBuild } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import BaseCalendar from "../../components/calendar/BaseCalendar";
import { privateDataRouterExpress } from "../../routes/private.routes";

export const HomeScreen = () => {
  const navigate = useNavigate();

  const handleOnClick = (path: string) => {
    navigate(path);
  };
  return (
    <>
      <Container
        minW={{ base: "90%", md: "90%" }}
        padding={{ base: 0, md: undefined }}
        marginTop={10}
      >
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={10}
          justifyItems="center"
        >
          {privateDataRouterExpress.map((data) => (
            <Button
              height="80px"
              width={{ base: "170px", md: "100%" }}
              padding={6}
              key={data.to}
              rounded={10}
              colorScheme="gray"
              variant="solid"
              onClick={() => handleOnClick(data.path)}
              leftIcon={<Icon as={data.icon} h={30} w={30} color="blue.400" />}
              borderWidth={1}
              borderColor="gray.200"
              boxShadow="2xl"
            >
              {data.name}
            </Button>
          ))}
        </SimpleGrid>{" "}
      </Container>
    </>
  );
};

export default HomeScreen;
