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
  useToast,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { postLogout } from "@/services/request/post/postLogout";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps {
  user: any;
  type: string;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const toast = useToast();
  const { token, login } = useAuth();

  const onLogout = async () => {
    await postLogout(token!, toast, login);
  };

  const onViewProfile = () => {};

  return (
    <Flex as="header" bg="#1A202C" color="white" h="50px" alignItems="center">
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
              src={`/api/${user?.profileImageUrl.split("/uploads/")[1]}`}
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
        <MenuList
          bg="gray.800"
          border="none"
          borderColor="rgba(255, 255, 255, 0.8)"
          boxShadow="0 4px 6px rgba(0, 0, 0, 1)"
          borderRadius="md"
        >
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
