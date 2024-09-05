import { LikeCommentRemove } from "@/components/likeCommentRemove";
import { Box, Card, CardBody, HStack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";

interface QuestionsSwitchProps {
  data: any;
  onLike: (data: any) => void;
  onViewData: (data: any, type: string) => void;
}

export const QuestionsSwitch: FC<QuestionsSwitchProps> = ({
  data,
  onLike,
  onViewData,
}) => {
  return data?.map((item: any, idx: number) => (
    <Card key={`${item?.id}-${idx}`} minH="200px" width="600px">
      <CardBody
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <HStack h="30px" w="100%" ml={2}>
          <Text> {item?.anonymous ? "Anônimo" : item?.userData.nickname}</Text>
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
          <LikeCommentRemove
            onClick={() => onLike(item)}
            IconType={AiOutlineLike}
            textValue={item?.likes || 0}
          />
          <LikeCommentRemove
            onClick={() => onViewData(item, "questions")}
            IconType={AiOutlineComment}
            textValue={item?.answers?.length || 0}
          />
        </HStack>
      </CardBody>
    </Card>
  ));
};
