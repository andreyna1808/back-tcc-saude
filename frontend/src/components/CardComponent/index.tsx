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
  data: Array<any>;
  type: "questions" | "answers";
  onViewData?: () => void;
  onAnswerData?: () => void;
  onLike: (data: any) => void;
}

export const CardComponent: FC<CardComponentProps> = ({
  data,
  type,
  title,
  onLike,
  onViewData,
  onAnswerData,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const typeData = () => {
    switch (type) {
      case "answers":
        return data?.map((item: any, idx: number) => (
          <Card key={`${item?.id}-${idx}`} minH="170px" width="600px">
            <CardBody
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <HStack h="30px" w="100%" justify="space-between" ml={2}>
                <Text>{`Nome: ${item?.doctorData.name}`}</Text>
                <Text>{`CRM: ${item?.doctorData.crm}`}</Text>
                <Text>{`Especialidade: ${item?.doctorData.specialty}`}</Text>
              </HStack>
              <Center
                justifyContent="space-between"
                maxW="550px"
                p={2}
                overflow="hidden"
                onClick={onViewData}
                cursor="pointer"
                borderRadius="8px"
                _hover={{ bg: "#343A40" }}
              >
                <Text
                  w="460px"
                  display="-webkit-box"
                  maxH={isExpanded ? "none" : "32px"}
                  overflow={isExpanded ? "visible" : "hidden"}
                  whiteSpace={isExpanded ? "normal" : "nowrap"}
                  textOverflow={isExpanded ? "clip" : "ellipsis"}
                  css={{
                    WebkitLineClamp: isExpanded ? "none" : 1,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item?.content}
                </Text>
                <Box mt={3} h="32px">
                  <Text
                    fontSize={12}
                    onClick={handleToggleExpand}
                    color="#228B22"
                    _hover={{ textDecoration: "underline" }}
                  >
                    {isExpanded ? "Ver menos" : "Ver mais"}
                  </Text>
                </Box>
              </Center>
              <HStack h="40px" w="100%">
                <HStack>
                  <AiOutlineLike size={24} />
                  <p>{item?.likes || 0}</p>
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
                onClick={onViewData}
                cursor="pointer"
                borderRadius="8px"
                _hover={{ bg: "#343A40" }}
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

      default:
        return <></>;
    }
  };

  return (
    <VStack maxH="80vh" mt={4}>
      <Text fontSize={24}>{title}</Text>
      <VStack pb={2} overflow="auto">
        {data.length ? (
          typeData()
        ) : (
          <Card width="600px">
            <CardBody display="flex" justifyContent="center">
              <Text>Nenhuma pergunta encontrada!</Text>
            </CardBody>
          </Card>
        )}
      </VStack>
    </VStack>
  );
};
