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
import { useAppSelector } from "../../app/hooks";
import Swal from "sweetalert2";
import SidebarContent from "./SidebarContent";
import { Outlet } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import DrawerMenu from "./DrawerMenu";

export default function LayoutWithNavbarSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { messages } = useAppSelector((state) => state.authState);
  const [isClose, setIsClose] = useState(false);
  const drawer = useDisclosure();
  const btnRef = useRef(null);

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
          display={{ base: "none", md: "block" }}
        />

        {/* mobilenav */}
        <Navbar drawer={drawer} btnRef={btnRef} />

        <Box ml={{ base: 0, md: 60 }} p="4">
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
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "flex-end", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        ref={btnRef}
        aria-label="menu"
        display={{ md: "none" }}
        icon={<Icon as={ImMenu} w={5} h={5} />}
        onClick={drawer.onOpen}
      />
      {
        <Box display={{ md: "none" }}>
          <DrawerMenu drawer={drawer} btnRef={btnRef} />
        </Box>
      }
    </Flex>
  );
};
