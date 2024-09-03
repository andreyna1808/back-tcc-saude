import React from "react";
import {
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  Avatar,
  MenuList,
  Center,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa"; // Ícone para fallback

interface HeaderProps {
  user: any;
  type: "doctors" | "users";
  onLogout?: () => void;
  onViewProfile?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onViewProfile }) => {
  return (
    <Flex as="header" bg="#013220" color="white" h="50px" alignItems="center">
      <Text
        fontSize="xl"
        fontWeight="bold"
        w="100%"
        display="flex"
        justifyContent="center"
      >
        Bem Vindo(a)!
      </Text>

      <Menu>
        <MenuButton
          w="180px"
          bg="none"
          h="40px"
          mr={4}
          _hover={{ bg: "#0d7200" }}
        >
          <Center justifyContent="space-around">
            <Avatar
              name={user?.name}
              src={user?.profileImageUrl}
              size="sm"
              bg="white"
              borderWidth="2px"
              icon={user?.profileImageUrl ? undefined : <FaUserCircle />}
            />
            <Text
              maxW="170px"
              isTruncated
              whiteSpace="nowrap"
              overflow="hidden"
            >
              Olá, {user?.name || "usuário"}
            </Text>
          </Center>
        </MenuButton>
        <MenuList bg="gray.800" border="none">
          <MenuItem
            bg="gray.800"
            _hover={{ bg: "#0d7200" }}
            onClick={onViewProfile}
          >
            Ver Perfil
          </MenuItem>
          <MenuItem bg="gray.800" _hover={{ bg: "#0d7200" }} onClick={onLogout}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Header;
