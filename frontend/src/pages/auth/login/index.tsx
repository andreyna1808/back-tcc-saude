import React from "react";
import { DynamicForm } from "@/components/dynamicForm";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { GeneralBody } from "@/components/generalBody";
import { useAppContext } from "@/context/AppContext";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import { HeaderLink } from "@/components/headerLink";
import { useAuth } from "@/context/AuthContext";
import { postLogin } from "@/services/request/post/postLogin";
import useAuthRedirect from "@/hooks/Auth/useAuthRedirect";

const Login = () => {
  useAuthRedirect();
  const router = useRouter();
  const toast = useToast();
  const { selected, setSelected } = useAppContext();
  const { login } = useAuth();

  const onSelected = (type: "doctors" | "users") => {
    setSelected(type);
  };

  const handleFormSubmit = async (data: Record<string, any>) => {
    await postLogin(data, selected, toast, login);
  };

  const DynamicFormComponent = () => (
    <VStack w="45%">
      <Heading fontSize={32}>Login</Heading>
      <DynamicForm
        typeChange="Realizar Cadastro"
        typeConfirm="Entrar"
        fields={["email", "password"]}
        onSubmit={handleFormSubmit}
        onChangeEvent={() => router.push(`/auth/register`)}
      />
    </VStack>
  );

  return (
    <main>
      <Flex>
        <IconButton
          onClick={() => router.push(`/`)}
          aria-label="Previous"
          icon={<FaArrowLeft />}
          h="30px"
          w="50px"
          m={4}
        />
        <HeaderLink onSelected={onSelected} />
      </Flex>

      <Box mb="1%">
        <GeneralBody
          selected={selected}
          renderComponent={DynamicFormComponent}
        />
      </Box>
    </main>
  );
};

export default Login;
