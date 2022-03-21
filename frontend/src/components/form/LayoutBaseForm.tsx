import {
  Box,
  Button,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
interface IProps {
  children: React.ReactNode;
  title: string;
}
const LayoutBaseForm = ({ title, children }: IProps) => {
  const bgForm = useColorModeValue("white", "gray.700");
  return (
    <>
      <Box
        bg={bgForm}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
        borderColor={"#e3d8d8"}
        borderWidth={1}
      >
        <Heading
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "3xl" }}
          my="4"
          textAlign={"center"}
        >
          {title}
        </Heading>
        {children}
        <Stack direction={"column"} spacing={4} mt={5}>
          <Button
            colorScheme="pink"
            variant="solid"
            type={"submit"}
            width={"fullWidth"}
          >
            Enviar
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default LayoutBaseForm;
