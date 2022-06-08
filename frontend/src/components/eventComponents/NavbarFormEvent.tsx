import {
  Grid,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import React from "react";
import { BiSearch } from "react-icons/bi";

const NavbarFormEvent = () => {
  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
        }}
        gap={4}
        my={3}
      >
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={BiSearch} />}
          />
          <Input type="search" placeholder="Search" />
        </InputGroup>
        <Select placeholder="Ordenar">
          <option value="option1">Eventos vigente</option>
          <option value="option2">Eventos pasadas</option>
          <option value="option3">A-Z</option>
          <option value="option3">Z-A</option>
        </Select>
      </Grid>
    </>
  );
};

export default NavbarFormEvent;
