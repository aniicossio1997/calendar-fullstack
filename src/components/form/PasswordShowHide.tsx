import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

interface IProps {
  name?: string;
  label?: string;
  [x: string]: any;
}
const PasswordShowHide = ({ name, label, ...rest }: IProps) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <InputGroup size="md">
        <Input
          autoComplete="on"
          id={name}
          {...rest}
          pr="4.5rem"
          type={show ? "text" : "password"}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? (
              <Icon as={BsFillEyeFill} h={6} w={6} />
            ) : (
              <Icon as={BsFillEyeSlashFill} h={6} w={6} />
            )}
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default PasswordShowHide;
