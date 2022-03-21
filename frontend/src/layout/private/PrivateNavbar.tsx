import {
  Box,
  Stack,
  Heading,
  Flex,
  Button,
  useDisclosure,
  useColorModeValue,
  Icon,
  Link,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { ImMenu, ImCross } from "react-icons/im";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { privateDataRoutes } from "../../routes/private.routes";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Fragment, useRef } from "react";
import { MdLogout } from "react-icons/md";
import ItemLink from "../../components/navbar/ItemLink";

const PrivateNavbar = () => {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const [isSmall] = useMediaQuery("(max-width: 780px)");
  const colorValue = useColorModeValue("gray.80", undefined);
  const islogin = useAppSelector((state) => state.authState.isLogin);
  const drawer = useDisclosure();
  const btnRef = useRef(null);

  const navigate = useNavigate();
  const closeSesion = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <Box zIndex={999} top={0} position={"sticky"}>
        <Stack
          as={"header"}
          padding={4}
          width={"100%"}
          borderBottomColor={"gray.30"}
          borderBottomWidth={1}
          bg={useColorModeValue("gray.100", "gray.900")}
        >
          <Flex
            as="nav"
            direction={"row"}
            justifyContent="space-between"
            wrap="wrap"
          >
            <Flex align="center" mr={5}>
              <Heading as="h1" size="lg" letterSpacing={"tighter"}>
                ❰AC-Calendar❱
              </Heading>
            </Flex>
            <Button ref={btnRef} colorScheme="teal" onClick={drawer.onOpen}>
              Menu
            </Button>
            <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
              {!isOpen ? <Icon as={ImMenu} /> : <Icon as={ImCross} />}
            </Box>
            <Stack
              bg={colorValue}
              direction={{ base: "column", md: "row" }}
              display={{ base: isOpen ? "flex" : "none", md: "flex" }}
              w={{ base: "100%", md: "auto" }}
              alignItems={{ base: "center", md: "flex-end" }}
              justifyContent={"end"}
              flexGrow={1}
              mt={{ base: 6, md: 0 }}
              spacing={6}
            >
              {islogin &&
                privateDataRoutes.map((route) => (
                  <Fragment key={route.to}>
                    <ItemLink to={route.to} name={route.name} />
                  </Fragment>
                ))}
              <Link style={{ textDecoration: "none " }} onClick={closeSesion}>
                <Stack alignItems="center" color={"inherit"} direction="row">
                  <b>{"SALIR"}</b>
                  <Icon as={MdLogout} h="5" w={"5"} />
                </Stack>
              </Link>
            </Stack>
          </Flex>
        </Stack>
      </Box>
    </>
  );
};

export default PrivateNavbar;
