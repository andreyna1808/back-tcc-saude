import { LikeCommentRemove } from "@/components/likeCommentRemove";
import { Box, Card, CardBody, Center, HStack, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

interface AnswersSwitchProps {
  data: Array<any>;
  onViewData: (data: any, type: string) => void;
  onRemove: (data: any, type: string) => void;
  onLike: (data: any) => void;
  widthCard?: string;
}

export const AnswersSwitch: FC<AnswersSwitchProps> = ({
  data,
  widthCard = "600px",
  onLike,
  onRemove,
  onViewData,
}) => {
  const [expandedItems, setExpandedItems] = useState<any>({});

  const handleToggleExpand = (id: string) => {
    setExpandedItems((prevState: any) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

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
        <HStack h="40px" w="100%" justifyContent="space-between">
          <LikeCommentRemove
            onClick={() => onLike(item)}
            IconType={AiOutlineLike}
            textValue={item?.likes || 0}
          />
          {/* <LikeCommentRemove
            colorHover="#ff3a3a"
            onClick={() => onViewData(item, "questions")}
            IconType={MdDeleteOutline}
            textValue={"Remover"}
          /> */}
        </HStack>
      </CardBody>
    </Card>
  ));
};
