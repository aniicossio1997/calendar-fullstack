import { useEffect, useState, useRef } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  useDisclosure,
  FlexProps,
  Icon,
  useMediaQuery,
} from "@chakra-ui/react";
import { Container, Alert, AlertIcon } from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import Swal from "sweetalert2";
import SidebarContent from "./SidebarContent";
import { Outlet } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import DrawerMenu from "./DrawerMenu";
import { retriveEventsOfUser } from "../../features/calendar/eventsActions";
import { authMe } from "../../features/auth/authActions";
import { motion } from "framer-motion";

export default function LayoutWithNavbarSidebar() {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { messages, user } = useAppSelector((state) => state.authState);

  const [isClose, setIsClose] = useState(false);
  const drawer = useDisclosure();
  const btnRef = useRef(null);
  useEffect(() => {
    const retriveEvents = async () => {
      await dispatch(authMe());
      await dispatch(retriveEventsOfUser(user.id));
    };
    retriveEvents();
  }, []);

  useEffect(() => {
    if (messages.show) {
      Swal.fire({
        title: messages.description,
        icon: "error",
        confirmButtonText: "close",
        showCloseButton: true,
      });
    }
  }, [messages]);
  return (
    <>
      <Container>
        {messages.show && (
          <Alert
            status={messages.type}
            variant="top-accent"
            my={10}
            display={messages.show && isClose ? "flex" : "none"}
          >
            <CloseButton position="absolute" right="8px" top="8px" />
            <AlertIcon />
            {messages.description}
          </Alert>
        )}
      </Container>
      <Box minH="100vh">
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", lg: "block" }}
        />

        {/* mobilenav */}
        <Navbar drawer={drawer} btnRef={btnRef} />

        <Box ml={{ base: 0, lg: 60 }} p="2">
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

interface MobileProps extends FlexProps {
  btnRef: React.MutableRefObject<null>;
  drawer: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
  };
}
const Navbar = ({ btnRef, drawer, ...rest }: MobileProps) => {
  const [isMd] = useMediaQuery("(min-width: 768px)");

  return (
    <Flex
      ml={{ base: 0, lg: 60 }}
      px={{ base: 4, lg: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "flex-end", lg: "flex-end" }}
      {...rest}
    >
      <IconButton
        ref={btnRef}
        aria-label="menu"
        display={{ lg: "none" }}
        icon={<Icon as={ImMenu} w={5} h={5} />}
        onClick={drawer.onOpen}
      />
      {
        <Box display={{ lg: "none" }}>
          <DrawerMenu drawer={drawer} btnRef={btnRef} />
        </Box>
      }
    </Flex>
  );
};
