import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FC, useRef, useState } from "react";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { CardComponent } from "../CardComponent";
import { IoMdClose } from "react-icons/io";
import { QuestionSwitch } from "./switch/questions";

interface ModalComponentProps {
  isOpen: boolean;
  setIsOpen: any;
  viewDataModal: {
    data: any;
    type: string;
  };
  typeUser: string;
  setViewDataModal: any;
  onLikeOrDeslike: (data: any) => void;
  onPublishComent?: (dataQuestion: any, answer: string) => void;
}

export const ModalComponent: FC<ModalComponentProps> = ({
  isOpen,
  typeUser,
  setIsOpen,
  viewDataModal,
  onPublishComent,
  onLikeOrDeslike,
  setViewDataModal,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [answer, setAnswer] = useState(false);
  const { data, type } = viewDataModal;
  const btnRef = useRef(null);

  console.log("ModalComponent: ", data, type, typeUser);

  const onClose = () => {
    setIsOpen(false);
    setViewDataModal({ data: null, type: null });
  };

  const componentData = () => {
    switch (type) {
      case "answers":
        return (
          <ModalContent bg="#343A40">
            <ModalHeader>
              <HStack h="30px" w="100%" ml={2}>
                <Text>
                  {data?.anonymous ? "Anônimo" : data?.userData.nickname}
                </Text>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text></Text>
            </ModalBody>
            <ModalFooter>
              <Button w="60px" onClick={onClose}>
                Sair
              </Button>
            </ModalFooter>
          </ModalContent>
        );
      case "questions":
        return (
          <QuestionSwitch
            data={data}
            typeUser={typeUser}
            onPublishComent={onPublishComent}
            onLikeOrDeslike={onLikeOrDeslike}
          />
        );

      default:
        return <></>;
    }
  };

  return (
    <Modal
      size={"xl"}
      onClose={onClose}
      finalFocusRef={btnRef}
      isOpen={isOpen}
      scrollBehavior={"inside"}
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      {componentData()}
    </Modal>
  );
};
