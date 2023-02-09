import {
  Button,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { GoKebabVertical, GoTrashcan } from "react-icons/go";
import "./styleMenu.css";
interface IProps {
  handleDeleted: () => void;
}
const MenuDots = ({ handleDeleted }: IProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Menu>
        <MenuButton
          color={"gray.600"}
          as={IconButton}
          icon={<Icon as={GoKebabVertical} w={6} h={6} />}
          variant="outline"
          borderWidth={0}
        />

        <MenuList aria-orientation="horizontal" className="menuList">
          <MenuItem
            icon={<Icon as={GoTrashcan} w={4} h={4} />}
            bgColor={"teal.50"}
            onClick={handleDeleted}
          >
            Borrar
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default MenuDots;
