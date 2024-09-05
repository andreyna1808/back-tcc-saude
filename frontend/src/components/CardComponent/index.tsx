import { Card, CardBody, Center, HStack, Text, VStack } from "@chakra-ui/react";
import { FC, useState } from "react";
import { AnswersSwitch } from "./switch/answersSwitch";
import { QuestionsSwitch } from "./switch/questionsSwitch";
import { AnswersByDoctorSwitch } from "./switch/answersByDoctor";
import { LikeCommentRemove } from "../likeCommentRemove";
import { MdModeEdit } from "react-icons/md";
import { ModalComponent } from "../ModalComponent";

interface CardComponentProps {
  title: string;
  data: any;
  typeUser?: string;
  type: "questions" | "answers" | "answersByDoctor";
  notfound: string;
  onViewData: (data: any, type: string) => void;
  onRemove: (data: any, type: string) => void;
  onCreateQuestion?: (content: string, anonymous: boolean) => void;
  onLike: (data: any) => void;
  widthCard?: string;
  heightCard?: string;
}

export const CardComponent: FC<CardComponentProps> = ({
  data,
  type,
  title,
  notfound,
  onCreateQuestion,
  typeUser,
  widthCard = "600px",
  heightCard = "80vh",
  onLike,
  onRemove,
  onViewData,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [viewDataModal, setViewDataModal] = useState<any>({
    data: null,
    type: "createQuestion",
  });

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
      <Center>
        <Text fontSize={24}>{title} </Text>
        <Center>
          {typeUser == "users" && (
            <Center ml={4} mt={1}>
              <LikeCommentRemove
                onClick={() => setIsOpen(true)}
                IconType={MdModeEdit}
                textValue={"Faça uma pergunta!"}
                sizeIcon={20}
              />
            </Center>
          )}
        </Center>
      </Center>

      <VStack pb={2} overflow="auto">
        {!!data?.id || !!data?.length ? (
          typeData()
        ) : (
          <Card width="600px">
            <CardBody display="flex" justifyContent="center">
              <Text>{notfound}</Text>
            </CardBody>
            {typeUser == "users" && (
              <Center mb={4}>
                <LikeCommentRemove
                  onClick={() => setIsOpen(true)}
                  IconType={MdModeEdit}
                  textValue={"Crie uma agora!"}
                  sizeIcon={20}
                />
              </Center>
            )}
          </Card>
        )}
      </VStack>
      {isOpen && (
        <ModalComponent
          isOpen={isOpen}
          typeUser={typeUser!}
          setIsOpen={setIsOpen}
          onCreateQuestion={onCreateQuestion}
          viewDataModal={{
            data: null,
            type: "createQuestion",
          }}
          setViewDataModal={setViewDataModal}
        />
      )}
    </VStack>
  );
};
