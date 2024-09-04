import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Text,
  VStack,
  Center,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";

interface CardComponentProps {
  title: string;
  data: any;
  type: "questions" | "answers" | "answersByDoctor";
  notfound: string;
  onViewData: (data: any, type: string) => void;
  onAnswerData?: () => void;
  onLike: (data: any) => void;
  widthCard?: string;
  heightCard?: string;
}

export const CardComponent: FC<CardComponentProps> = ({
  data,
  type,
  title,
  notfound,
  widthCard = "600px",
  heightCard = "80vh",
  onLike,
  onViewData,
  onAnswerData,
}) => {
  const [expandedItems, setExpandedItems] = useState<any>({});

  const handleToggleExpand = (id: string) => {
    setExpandedItems((prevState: any) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const typeData = () => {
    switch (type) {
      case "answers":
        return data?.map((item: any, idx: number) => (
          <Card key={`${item?.id}-${idx}`} minH="170px" width={widthCard}>
            <CardBody
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <HStack h="30px" w="100%" justify="space-between" ml={2}>
                <Text>{`Nome: ${item?.doctorData?.name}`}</Text>
                <Text>{`CRM: ${item?.doctorData.crm}`}</Text>
                <Text>{`Especialidade: ${item?.doctorData.specialty}`}</Text>
              </HStack>
              <Center
                justifyContent="space-between"
                maxW="550px"
                p={2}
                overflow="hidden"
                cursor="pointer"
                borderRadius="8px"
                _hover={{ bg: "#343A40" }}
                onClick={() => onViewData(item, "answers")}
              >
                <Text
                  w="440px"
                  display="-webkit-box"
                  maxH={expandedItems[item.id] ? "none" : "32px"}
                  overflow={expandedItems[item.id] ? "visible" : "hidden"}
                  whiteSpace={expandedItems[item.id] ? "normal" : "nowrap"}
                  textOverflow={expandedItems[item.id] ? "clip" : "ellipsis"}
                  css={{
                    WebkitLineClamp: expandedItems[item.id] ? "none" : 1,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item?.content}
                </Text>
                <Box mt={3} h="32px" w="60px">
                  <Text
                    fontSize={12}
                    onClick={(evt) => {
                      evt.stopPropagation();
                      handleToggleExpand(item.id);
                    }}
                    color="#228B22"
                    _hover={{ textDecoration: "underline" }}
                  >
                    {expandedItems[item.id] ? "Ver menos" : "Ver mais"}
                  </Text>
                </Box>
              </Center>
              <HStack h="40px" w="100%">
                <HStack
                  _hover={{
                    ".icon": { fill: "green" },
                    ".text": { color: "green" },
                  }}
                  onClick={() => onLike(item)}
                  cursor="pointer"
                >
                  <AiOutlineLike size={24} className="icon" />
                  <Text className="text">{item?.likes || 0}</Text>
                </HStack>
              </HStack>
            </CardBody>
          </Card>
        ));
      case "questions":
        return data?.map((item: any, idx: number) => (
          <Card key={`${item?.id}-${idx}`} minH="200px" width="600px">
            <CardBody
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <HStack h="30px" w="100%" ml={2}>
                <Text> {item?.anonymous ? "Anônimo" : item?.nickname}</Text>
              </HStack>
              <Box
                maxW="550px"
                h="100px"
                p={2}
                overflow="hidden"
                cursor="pointer"
                borderRadius="8px"
                _hover={{ bg: "#343A40" }}
                onClick={() => onViewData(item, "questions")}
              >
                <Text
                  display="-webkit-box"
                  maxH="100px"
                  overflow="hidden"
                  whiteSpace="normal"
                  textOverflow="ellipsis"
                  css={{
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item?.content}
                </Text>
              </Box>
              <HStack h="40px" w="100%" justifyContent="space-between">
                <Button
                  w="80px"
                  _hover={{ bg: "#343A40" }}
                  bg="none"
                  onClick={() => onLike(item)}
                  cursor="pointer"
                >
                  <AiOutlineLike size={24} />
                  <p>{item?.likes || 0}</p>
                </Button>
                <Button
                  w="80px"
                  onClick={onAnswerData}
                  _hover={{ bg: "#343A40" }}
                  bg="none"
                  cursor="pointer"
                >
                  <AiOutlineComment size={24} />
                  <p>{item?.answers?.length || 0}</p>
                </Button>
              </HStack>
            </CardBody>
          </Card>
        ));

      case "answersByDoctor":
        return data?.answers?.map((item: any, idx: number) => (
          <Card key={`${item?.id}-${idx}`} minH="170px" width={widthCard}>
            <CardBody
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <HStack h="30px" w="100%" justify="space-between" ml={2}>
                <Text>{`Nome: ${data?.name}`}</Text>
                <Text>{`CRM: ${data?.crm}`}</Text>
                <Text>{`Especialidade: ${data?.specialty}`}</Text>
              </HStack>
              <Center
                justifyContent="space-between"
                maxW="550px"
                p={2}
                overflow="hidden"
                cursor="pointer"
                borderRadius="8px"
                _hover={{ bg: "#343A40" }}
                onClick={() => onViewData(item, "answers")}
              >
                <Text
                  w="440px"
                  display="-webkit-box"
                  maxH={expandedItems[item.id] ? "none" : "32px"}
                  overflow={expandedItems[item.id] ? "visible" : "hidden"}
                  whiteSpace={expandedItems[item.id] ? "normal" : "nowrap"}
                  textOverflow={expandedItems[item.id] ? "clip" : "ellipsis"}
                  css={{
                    WebkitLineClamp: expandedItems[item.id] ? "none" : 1,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item?.content}
                </Text>
                <Box mt={3} h="32px" w="60px">
                  <Text
                    fontSize={12}
                    onClick={(evt) => {
                      evt.stopPropagation();
                      handleToggleExpand(item.id);
                    }}
                    color="#228B22"
                    _hover={{ textDecoration: "underline" }}
                  >
                    {expandedItems[item.id] ? "Ver menos" : "Ver mais"}
                  </Text>
                </Box>
              </Center>
              <HStack h="40px" w="100%">
                <HStack
                  _hover={{
                    ".icon": { fill: "green" },
                    ".text": { color: "green" },
                  }}
                  onClick={() => onLike(item)}
                  cursor="pointer"
                >
                  <AiOutlineLike size={24} className="icon" />
                  <Text className="text">{item?.likes || 0}</Text>
                </HStack>
              </HStack>
            </CardBody>
          </Card>
        ));
      default:
        return <></>;
    }
  };

  return (
    <VStack maxH={heightCard} mt={4}>
      <Text fontSize={24}>{title}</Text>
      <VStack pb={2} overflow="auto">
        {!!data ? (
          typeData()
        ) : (
          <Card width="600px">
            <CardBody display="flex" justifyContent="center">
              <Text>{notfound}</Text>
            </CardBody>
          </Card>
        )}
      </VStack>
    </VStack>
  );
};
