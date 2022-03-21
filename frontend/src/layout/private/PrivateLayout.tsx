import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import PrivateNavbar from "./PrivateNavbar";

const PrivateLayout: React.FunctionComponent = () => {
  const bgContainer = useColorModeValue("gray.50", "gray.800");

  return (
    <>
      <PrivateNavbar />
      <Container paddingY={4} maxWidth={"98%"}>
        <Box>
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default PrivateLayout;
