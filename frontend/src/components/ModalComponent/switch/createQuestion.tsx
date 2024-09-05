import {
  Center,
  HStack,
  Input,
  InputGroup,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Switch,
  Text,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface createQuestionPrps {
  onCreateQuestion?: (content: string, anonymous: boolean) => void;
  onClose: any;
}

export const CreateQuestion: FC<createQuestionPrps> = ({
  onClose,
  onCreateQuestion,
}) => {
  const [currentValue, setCurrentValue] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const onCleanAnswer = () => {
    setCurrentValue("");
    onClose();
  };

  return (
    <ModalContent bg="#343A40" maxH="80vh" w="100%">
      <ModalHeader>
        <HStack h="4vh" w="100%" ml={2}>
          <Text>Pergunta anônima?: </Text>
          <Switch
            mt={0.5}
            size="sm"
            onChange={(evt) => setAnonymous(evt.target.checked)}
          />
        </HStack>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody overflow="hidden" h="77vh">
        <HStack
          w="100%"
          mt={4}
          justifyContent="space-between"
          bg="#1A202C"
          borderRadius="8px"
          mb={12}
        >
          <InputGroup>
            <Input
              value={currentValue}
              color="white"
              placeholder="Escreva sua pergunta aqui"
              onChange={(evt: any) => setCurrentValue(evt.target?.value)}
            />
            <Text
              w="60px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              _hover={{ color: "green" }}
              fontSize="12px"
              onClick={() => {
                onCreateQuestion && onCreateQuestion(currentValue, anonymous);
                onCleanAnswer();
              }}
              mr={2}
            >
              Enviar
            </Text>
            <Center
              _hover={{
                ".icon": { fill: "green" },
              }}
              mr={2}
              w="40px"
              cursor="pointer"
              onClick={onCleanAnswer}
            >
              <IoMdClose size={16} className="icon" />
            </Center>
          </InputGroup>
        </HStack>
      </ModalBody>
    </ModalContent>
  );
};
