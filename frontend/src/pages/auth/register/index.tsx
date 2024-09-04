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
import { postRegister } from "@/services/request/post/postRegister";
import useAuthRedirect from "@/hooks/Auth/useAuthRedirect";

const Register = () => {
  useAuthRedirect();
  const toast = useToast();
  const router = useRouter();
  const { selected, setSelected } = useAppContext();

  const onSelected = (type: "doctors" | "users") => {
    setSelected(type);
  };

  const handleFormSubmit = async (data: Record<string, any>) => {
    await postRegister(data, selected, toast, router);
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
