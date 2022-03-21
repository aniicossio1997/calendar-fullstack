import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
interface IProps {
  drawer: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
  };
  btnRef: React.MutableRefObject<null>;
}
const DrawerMenu = ({ drawer, btnRef }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const closeSesion = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <>
      <Drawer
        isOpen={drawer.isOpen}
        placement="left"
        onClose={drawer.onClose}
        finalFocusRef={btnRef}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Calendar</DrawerHeader>
          <DrawerBody></DrawerBody>

          <DrawerFooter
            justifyItems={"flex-start"}
            justifyContent={"flex-start"}
          >
            <Button onClick={closeSesion} colorScheme={"red"}>
              Salir <Icon as={MdLogout} h="5" w={"5"} />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
