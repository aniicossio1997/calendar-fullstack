import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./navbar/Navbar";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  const bgContainer = useColorModeValue("gray.50", "gray.800");

  return (
    <>
      <Navbar />
      <Container paddingY={4} maxWidth={"98%"}>
        <Box>
          {children}
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default Layout;
