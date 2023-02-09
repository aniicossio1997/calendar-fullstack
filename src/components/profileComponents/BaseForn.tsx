import {
  Flex,
  Heading,
  Icon,
  IconButton,
  SpaceProps,
  Stack,
  StackProps,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { BiEdit } from "react-icons/bi";
interface IProps {
  title?: string;
  handleShowBtnEdit: () => void;
  children: React.ReactNode;
  [x: string]: any;
}
const BaseForn: React.FC<IProps> = ({
  children,
  title = "Profile Perfil",
  handleShowBtnEdit,
}) => {
  return (
    <>
      <Flex align={"center"} justify={"center"}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          padding={6}
          my={12}
        >
          <Flex direction={"row"} justify={"space-between"}>
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              {title}
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
