import { LikeCommentRemove } from "@/components/likeCommentRemove";
import {
  Box,
  Card,
  CardBody,
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
import { AiOutlineLike } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";

interface AnswerSwitchProps {
  data: any;
  onLikeOrDeslike: (data: any, type?: string) => void;
  onEditComment?: (dataQuestion: any, answer: string, type: string) => void;
  userData: any;
}

export const AnswerSwitch: FC<AnswerSwitchProps> = ({
  data,
  userData,
  onLikeOrDeslike,
  onEditComment,
}) => {
  const [currentValue, setCurrentValue] = useState(data?.content);
  const [isExpandedQuestion, setIsExpandedQuestion] = useState(false);
  const [isExpandedAnswer, setIsExpandedAnswer] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const onCleanAnswer = () => {
    setCurrentValue(data?.content);
    setIsEditable(false);
  };

  return (
    <ModalContent bg="#343A40" maxH="80vh" w="100%">
      <ModalHeader>
        <HStack h="3vh" w="100%" ml={2}>
          <Text>{data?.anonymous ? "Anônimo" : data?.userData?.nickname}</Text>
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
              h={isExpandedQuestion ? "auto" : "25.5px"}
              overflow={isExpandedQuestion ? "visible" : "hidden"}
              whiteSpace={isExpandedQuestion ? "normal" : "nowrap"}
              textOverflow={isExpandedQuestion ? "clip" : "ellipsis"}
            >
              {data?.questionData?.content}
            </Text>
            <Text
              w="60px"
              fontSize={12}
              onClick={() => setIsExpandedQuestion(!isExpandedQuestion)}
              userSelect="none"
              color="#228B22"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
              alignSelf="flex-start"
              ml={2}
            >
              {isExpandedQuestion ? "Ver menos" : "Ver mais"}
            </Text>
          </Flex>
        </Flex>
        <HStack h="40px" w="100%" mt={2} justifyContent="space-between">
          <LikeCommentRemove
            onClick={() =>
              onLikeOrDeslike(data?.questionData || data, "questions")
            }
            IconType={AiOutlineLike}
            textValue={data?.questionData?.likes || 0}
            defaultColor={
              userData?.likedQuestions?.find(
                (question: any) => question.questionId == data.questionData.id
              )
                ? "#0d7200"
                : "white"
            }
          />
        </HStack>
        <HStack justifyContent="space-between" alignItems="center" my={2}>
          <Text fontSize={20}>Sua resposta</Text>
          <LikeCommentRemove
            onClick={() => setIsEditable(true)}
            IconType={MdModeEdit}
            textValue={"Editar"}
            sizeIcon={20}
          />
        </HStack>
        <Card minH="170px" width="100%">
          <CardBody
            display="flex"
            flexDirection="column"
            justifyContent={isEditable ? "none" : "space-between"}
          >
            <HStack h="30px" w="100%" justify="space-between" ml={2}>
              <Text>{`Nome: ${data?.doctorData?.name}`}</Text>
              <Text>{`CRM: ${data?.doctorData?.crm}`}</Text>
              <Text>{`Especialidade: ${data?.doctorData?.specialty}`}</Text>
            </HStack>

            {isEditable ? (
              <HStack
                h="40px"
                w="100%"
                mt={4}
                justifyContent="space-between"
                bg="#1A202C"
                borderRadius="8px"
              >
                <InputGroup>
                  <Input
                    color="white"
                    value={currentValue}
                    placeholder="Escreva sua resposta aqui"
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
                      onEditComment &&
                        onEditComment(data, currentValue, "answers");
                      onCleanAnswer();
                    }}
                    mr={2}
                  >
                    Salvar
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
            ) : (
              <>
                <Center
                  justifyContent="space-between"
                  maxW="550px"
                  p={2}
                  overflow="hidden"
                  cursor="pointer"
                  borderRadius="8px"
                >
                  <Text
                    w="440px"
                    display="-webkit-box"
                    maxH={isExpandedAnswer ? "none" : "32px"}
                    overflow={isExpandedAnswer ? "visible" : "hidden"}
                    whiteSpace={isExpandedAnswer ? "normal" : "nowrap"}
                    textOverflow={isExpandedAnswer ? "clip" : "ellipsis"}
                    css={{
                      WebkitLineClamp: isExpandedAnswer ? "none" : 1,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {data?.content}
                  </Text>
                  <Box mt={3} h="32px" w="60px">
                    <Text
                      fontSize={12}
                      onClick={() => setIsExpandedAnswer(!isExpandedAnswer)}
                      color="#228B22"
                      _hover={{ textDecoration: "underline" }}
                    >
                      {isExpandedAnswer ? "Ver menos" : "Ver mais"}
                    </Text>
                  </Box>
                </Center>
                <HStack h="40px" w="100%">
                  <LikeCommentRemove
                    onClick={() => onLikeOrDeslike(data)}
                    IconType={AiOutlineLike}
                    textValue={data?.likes || 0}
                    defaultColor={
                      userData?.likedAnswers?.find(
                        (question: any) => question.answerId == data.id
                      )
                        ? "#0d7200"
                        : "white"
                    }
                  />
                </HStack>
              </>
            )}
          </CardBody>
        </Card>
      </ModalBody>
    </ModalContent>
  );
};
