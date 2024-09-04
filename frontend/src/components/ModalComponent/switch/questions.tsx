import { CardComponent } from "@/components/CardComponent";
import {
  Center,
  Flex,
  HStack,
  Input,
  InputGroup,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

interface ModalComponentProps {
  data: any;
  typeUser: string;
  onLikeOrDeslike: (data: any) => void;
  onPublishComent?: (dataQuestion: any, answer: string) => void;
}

export const QuestionSwitch: FC<ModalComponentProps> = ({
  data,
  typeUser,
  onPublishComent,
  onLikeOrDeslike,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentAnswer, setContentAnswer] = useState("");
  const [answer, setAnswer] = useState(false);

  const onCleanAnswer = () => {
    setContentAnswer("");
    setAnswer(false);
  };

  return (
    <ModalContent bg="#343A40" maxH="80vh" w="100%">
      <ModalHeader>
        <HStack h="3vh" w="100%" ml={2}>
          <Text>{data?.anonymous ? "Anônimo 2" : data?.userData.nickname}</Text>
        </HStack>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody overflow="hidden" h="77vh">
        <Flex
          direction="column"
          maxW="100%"
          p={2}
          overflow="hidden"
          bg="#1A202C"
          borderRadius="8px"
        >
          <Flex direction="row" align="flex-start" w="100%">
            <Text
              flex="1"
              display="-webkit-box"
              h={isExpanded ? "auto" : "25.5px"}
              overflow={isExpanded ? "visible" : "hidden"}
              whiteSpace={isExpanded ? "normal" : "nowrap"}
              textOverflow={isExpanded ? "clip" : "ellipsis"}
            >
              {data?.content}
            </Text>
            <Text
              w="60px"
              fontSize={12}
              onClick={() => setIsExpanded(!isExpanded)}
              userSelect="none"
              color="#228B22"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
              alignSelf="flex-start"
              ml={2}
            >
              {isExpanded ? "Ver menos" : "Ver mais"}
            </Text>
          </Flex>
        </Flex>
        <HStack h="40px" w="100%" mt={2} justifyContent="space-between">
          <HStack
            _hover={{
              ".icon": { fill: "green" },
              ".text": { color: "green" },
            }}
            onClick={() => onLikeOrDeslike(data)}
            cursor="pointer"
          >
            <AiOutlineLike size={24} className="icon" />
            <Text className="text">{data?.likes || 0}</Text>
          </HStack>
          <HStack
            _hover={{
              ".icon": { fill: "green" },
              ".text": { color: "green" },
            }}
            cursor={typeUser == "doctors" ? "pointer" : "auto"}
            onClick={() => (typeUser == "doctors" ? setAnswer(true) : {})}
          >
            <AiOutlineComment size={24} className="icon" />
            <Text className="text">{data?.answers?.length || 0}</Text>
            <Text className="text">
              {typeUser == "doctors" ? "Responder" : ""}
            </Text>
          </HStack>
        </HStack>
        {answer && (
          <HStack
            h="40px"
            w="100%"
            mt={2}
            justifyContent="space-between"
            bg="#1A202C"
            borderRadius="8px"
          >
            <InputGroup>
              <Input
                border="none"
                color="white"
                placeholder="Escreva sua resposta aqui"
                onChange={(evt: any) => setContentAnswer(evt.target?.value)}
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
                  onPublishComent && onPublishComent(data, contentAnswer);
                  onCleanAnswer();
                }}
                mr={2}
              >
                Publicar
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
        )}

        <CardComponent
          title={"Respostas"}
          data={data?.answers || []}
          type="answers"
          widthCard="100%"
          heightCard="50vh"
          notfound={"Essa pergunta ainda não teve respostas"}
          onLike={onLikeOrDeslike}
          onViewData={() => {}}
        />
      </ModalBody>
    </ModalContent>
  );
};
