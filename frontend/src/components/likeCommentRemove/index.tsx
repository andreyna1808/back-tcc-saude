import { HStack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { IconType } from "react-icons";

interface LikeCommentRemovePros {
  colorHover?: "green" | "#ff3a3a";
  onClick: any;
  IconType: IconType;
  textValue: string;
  sizeIcon?: number;
  cursor?: string;
}

export const LikeCommentRemove: FC<LikeCommentRemovePros> = ({
  colorHover = "green",
  cursor = "pointer",
  IconType,
  onClick,
  textValue,
  sizeIcon = 24,
}) => (
  <HStack
    _hover={{
      ".icon": { fill: colorHover },
      ".text": { color: colorHover },
    }}
    onClick={onClick}
    cursor={cursor}
  >
    <IconType size={sizeIcon} className="icon" />
    <Text className="text">{textValue}</Text>
  </HStack>
);
