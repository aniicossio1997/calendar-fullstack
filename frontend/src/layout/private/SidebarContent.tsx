import {
  Box,
  BoxProps,
  Button,
  CloseButton,
  DrawerFooter,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { privateDataRoutes } from "../../routes/private.routes";
import NavItem from "./NavItem";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import { eventsClear } from "../../features/calendar/calendarSlice";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const closeSesion = () => {
    dispatch(eventsClear());
    dispatch(logout());
    navigate("/");
  };
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {privateDataRoutes.map((link) => (
        <NavItem key={link.name} icon={link.icon} routeLink={link}>
          {link.name}
        </NavItem>
      ))}
      <Link style={{ textDecoration: "none " }} onClick={closeSesion}>
        <Stack
          alignItems="center"
          color={"inherit"}
          direction="row"
          padding={4}
          width={"100%"}
          align="center"
          p="2"
          mx="4"
          my={6}
        >
          <b>{"SALIR"}</b>
          <Icon as={MdLogout} h="5" w={"5"} />
        </Stack>
      </Link>
    </Box>
  );
};

export default SidebarContent;
