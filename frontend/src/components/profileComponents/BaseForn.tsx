import {
  Flex,
  Heading,
  Icon,
  IconButton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { BiEdit } from "react-icons/bi";
interface IProps {
  handleShowBtnEdit: () => void;
  children: React.ReactNode;
}
const BaseForn = ({ handleShowBtnEdit, children }: IProps) => {
  return (
    <>
      <Flex align={"center"} justify={"center"}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Flex direction={"row"} justify={"space-between"}>
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              User Profile
            </Heading>
            <IconButton
              aria-label="edit"
              icon={<Icon as={BiEdit} w={6} h={6} />}
              onClick={handleShowBtnEdit}
            />
          </Flex>
          {children}
        </Stack>
      </Flex>
    </>
  );
};

export default BaseForn;
