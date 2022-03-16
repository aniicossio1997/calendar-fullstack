import React from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";

const startDate = moment().minutes(0).seconds(0).add(1, "hour");
const CalendarModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();
  const initialRef = React.useRef(null);
  const handleStartDateChange = (e: Date) => {
    console.log(e);
  };
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        onClose={onClose}
        size={"md"}
        isOpen={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <DateTimePicker
                onChange={handleStartDateChange}
                value={startDate.toDate()}
              />
              <Input ref={initialRef} placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button onClick={() => onOpen()} m={4}>{`Open  Modal`}</Button>
    </>
  );
};

export default CalendarModal;
