import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";

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
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default PasswordShowHide;
