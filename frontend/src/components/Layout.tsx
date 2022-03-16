import { Box, Container } from "@chakra-ui/react";
import React from "react";
import Navbar from "./navbar/Navbar";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />

      <Container paddingY={4} maxWidth={"98%"}>
        <Box>{children}</Box>
      </Container>
    </>
  );
};

export default Layout;
