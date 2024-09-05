import { Card, CardBody, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { AnswersSwitch } from "./switch/answersSwitch";
import { QuestionsSwitch } from "./switch/questionsSwitch";
import { AnswersByDoctorSwitch } from "./switch/answersByDoctor";

interface CardComponentProps {
  title: string;
  data: any;
  type: "questions" | "answers" | "answersByDoctor";
  notfound: string;
  onViewData: (data: any, type: string) => void;
  onRemove: (data: any, type: string) => void;
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
  onRemove,
  onViewData,
}) => {
  const typeData = () => {
    switch (type) {
      case "answers":
        return (
          <AnswersSwitch
            data={data}
            onLike={onLike}
            onRemove={onRemove}
            widthCard={widthCard}
            onViewData={onViewData}
          />
        );
      case "questions":
        return (
          <QuestionsSwitch
            data={data}
            onLike={onLike}
            onViewData={onViewData}
          />
        );

      case "answersByDoctor":
        return (
          <AnswersByDoctorSwitch
            data={data}
            onLike={onLike}
            onRemove={onRemove}
            widthCard={widthCard}
            onViewData={onViewData}
          />
        );
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
