import {
  Flex,
  FlexProps,
  Icon,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactText } from "react";
import { IconType } from "react-icons";
import { Link as LinkDom, useLocation } from "react-router-dom";
import { IRouteWithIcon } from "../../routes/private.routes";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  routeLink: IRouteWithIcon;
}
export const NavItem = ({
  icon,
  children,
  routeLink,
  ...rest
}: NavItemProps) => {
  const { pathname } = useLocation();
  const color = useColorModeValue("pink.500", "pink.200");
  const colorText = useColorModeValue("white", "gray.200");

  return (
    <LinkDom to={routeLink.to} style={{ textDecoration: "none" }}>
      <Flex
        bg={pathname === routeLink.to ? color : "inherit"}
        color={pathname === routeLink.to ? colorText : "inherit"}
        align="center"
        p="2"
        mx="4"
        my={6}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" h={6} w={6} as={icon} />}
        {children}
      </Flex>
    </LinkDom>
  );
};

export default NavItem;
