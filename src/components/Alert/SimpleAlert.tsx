import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  CloseButton,
} from "@chakra-ui/react";
import React from "react";
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
  const handleShow = () => {
    dispatch(resetMessage());
  };

  return (
    <>
      {message.isShow && (
        <Alert
          status={message.type || "warning"}
          display={message.isShow ? "flex" : "none"}
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
