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

const Register = () => {
  const toast = useToast();
  const router = useRouter();
  const { selected, setSelected } = useAppContext();
  const { token } = useAuth();

  if (token) {
    return router.push("/feed");
  }

  const onSelected = (type: "doctors" | "users") => {
    setSelected(type);
  };

  const handleFormSubmit = async (data: Record<string, any>) => {
    try {
      await axios.post(`${basicUrl}/${selected}/register`, data);
      showToast(toast, {
        type: "success",
        title: "Success",
        description: "Registrado com sucesso",
      });
      router.push(`/auth/login`);
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

  const currentField =
    selected == "doctors"
      ? ["name", "crm", "email", "password", "specialty"]
      : ["name", "nickname", "email", "password"];

  const DynamicFormComponent = () => (
    <VStack w="45%">
      <Heading fontSize={32}>Cadastro</Heading>
      <DynamicForm
        typeChange="Realizar Login"
        typeConfirm="Cadastrar"
        fields={currentField}
        onSubmit={handleFormSubmit}
        onChangeEvent={() => router.push(`/auth/login`)}
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

export default Register;
