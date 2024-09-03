import { Link, Flex } from "@chakra-ui/react";
import { FC } from "react";

interface HeaderLinkProps {
  onSelected: (type: "doctors" | "users") => void;
}

export const HeaderLink: FC<HeaderLinkProps> = ({ onSelected }) => {
  return (
    <Flex w="100%" justify="center" align="center">
      <Link
        mr={12}
        cursor="pointer"
        userSelect="none"
        _hover={{ color: "#228B22", textDecoration: "underline" }}
        _active={{ color: "green" }}
        onClick={() => onSelected("doctors")}
      >
        Sou médico
      </Link>
      <Link
        ml={12}
        cursor="pointer"
        userSelect="none"
        _hover={{ color: "#228B22", textDecoration: "underline" }}
        _active={{ color: "green" }}
        onClick={() => onSelected("users")}
      >
        Sou consultante
      </Link>
    </Flex>
  );
};
