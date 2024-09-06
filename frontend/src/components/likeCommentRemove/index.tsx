import { HStack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { IconType } from "react-icons";

interface LikeCommentRemovePros {
  colorHover?: "green" | "#ff3a3a" | "white";
  onClick: any;
  IconType: IconType;
  textValue: string;
  sizeIcon?: number;
  cursor?: string;
  defaultColor?: string
}

export const LikeCommentRemove: FC<LikeCommentRemovePros> = ({
  colorHover = "green",
  cursor = "pointer",
  IconType,
  onClick,
  textValue,
  sizeIcon = 24,
  defaultColor = "white"
}) => (
  <HStack
    _hover={{
      ".icon": { fill: colorHover },
      ".text": { color: colorHover },
    }}
    onClick={onClick}
    cursor={cursor}
  >
    <IconType size={sizeIcon} className="icon" fill={defaultColor} />
    <Text className="text" color={defaultColor}>{textValue}</Text>
  </HStack>
);
