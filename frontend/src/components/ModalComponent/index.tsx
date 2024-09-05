import { Modal, ModalOverlay } from "@chakra-ui/react";
import { FC, useRef, useState } from "react";
import { QuestionSwitch } from "./switch/questions";
import { AnswerSwitch } from "./switch/answers";
import { CreateQuestion } from "./switch/createQuestion";

interface ModalComponentProps {
  isOpen: boolean;
  setIsOpen: any;
  viewDataModal: {
    data: any;
    type: string;
  };
  typeUser: string;
  setViewDataModal?: any;
  onLikeOrDeslike?: (data: any, type?: string) => void;
  onPublishComment?: (dataQuestion: any, answer: string) => void;
  onEditComment?: (dataQuestion: any, answer: string, type: string) => void;
  onCreateQuestion?: (content: string, anonymous: boolean) => void;
}

export const ModalComponent: FC<ModalComponentProps> = ({
  isOpen,
  typeUser,
  setIsOpen,
  onEditComment,
  viewDataModal,
  onCreateQuestion,
  onPublishComment,
  onLikeOrDeslike,
  setViewDataModal,
}) => {
  const { data, type } = viewDataModal;
  const btnRef = useRef(null);

  const onClose = () => {
    setIsOpen(false);
    setViewDataModal({ data: null, type: null });
  };

  const componentData = () => {
    switch (type) {
      case "answers":
        return (
          <AnswerSwitch
            data={data}
            onLikeOrDeslike={onLikeOrDeslike!}
            onEditComment={onEditComment}
          />
        );
      case "questions":
        return (
          <QuestionSwitch
            data={data}
            typeUser={typeUser}
            onPublishComment={onPublishComment}
            onLikeOrDeslike={onLikeOrDeslike!}
          />
        );
      case "createQuestion":
        return <CreateQuestion onCreateQuestion={onCreateQuestion} onClose={onClose} />;
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
