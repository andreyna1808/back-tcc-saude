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
import axios from "axios";
import { basicUrl } from "@/utils/urls";
import { showToast } from "@/components/toast";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const router = useRouter();
  const toast = useToast();
  const { selected, setSelected } = useAppContext();
  const { login, token } = useAuth();

  if (token) {
    return router.push("/feed");
  }

  const onSelected = (type: "doctors" | "users") => {
    setSelected(type);
  };

  const handleFormSubmit = async (data: Record<string, any>) => {
    try {
      const res = await axios.post(`${basicUrl}/auth/${selected}/login`, data);
      showToast(toast, {
        type: "success",
        title: "Success",
        description: "Usuário logado com sucesso",
      });

      login(res.data?.token, res.data?.expiresAt, res.data?.typeUser);
      router.push(`/feed`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(toast, {
          type: "error",
          title: "Error",
          description: error.response?.data || "An error occurred.",
        });
      } else {
        console.error("Unexpected error: ", error);
      }
    }
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
