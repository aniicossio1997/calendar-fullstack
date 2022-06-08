import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetMessage } from "../../features/ui/uiMessageSlice";

interface IProps {
  paramsMessage?: {
    isShow: boolean;
    description: string;
    type: "error" | "success" | null;
  } | null;
}
const SimpleAlert = ({ paramsMessage }: IProps) => {
  const storeMessage = useAppSelector((store) => store.uiMessage);
  let message = paramsMessage || storeMessage;
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(true);
  const handleShow = () => {
    setVisible(!visible);
    dispatch(resetMessage());
  };
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      {message.isShow && visible && (
        <Alert
          status={message.type || "warning"}
          display={visible ? "flex" : "none"}
        >
          <AlertIcon />
          <Box flex="1">
            {/* <AlertTitle>Success!</AlertTitle> */}
            <AlertDescription display="block" padding={4}>
              {message.description}
            </AlertDescription>
          </Box>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={handleShow}
          />
        </Alert>
      )}
    </>
  );
};

export default SimpleAlert;
