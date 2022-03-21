import { Box, Link, Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

const NavLink = ({ children }: { children: ReactNode }) => {
  const bgColorLink = useColorModeValue("gray.200", "gray.700");
  // const { pathname } = useLocation();
  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: bgColorLink,
      }}
      href={`/${children}`}
    >
      {children}
    </Link>
  );
};

const NavResponse = ({ Links }: { Links: string[] }) => {
  return (
    <Box pb={4} display={{ md: "none" }}>
      <Stack
        as={"nav"}
        spacing={4}
        justifyContent={"center"}
        alignContent={"center"}
        alignItems={"center"}
      >
        {Links.map((link) => (
          <NavLink key={link}>{link}</NavLink>
        ))}
      </Stack>
    </Box>
  );
};

export default NavResponse;
