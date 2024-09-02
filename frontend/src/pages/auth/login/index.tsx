import React from "react";
import { useState } from "react";
import { DynamicForm } from "@/components/dynamicForm";
import { Box, Heading, IconButton, VStack } from "@chakra-ui/react";
import { GeneralBody } from "@/components/generalBody";
import { useAppContext } from "@/context/AppContext";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const { selected, setSelected } = useAppContext();
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleFormSubmit = (data: Record<string, any>) => {
    console.log("data: ", data, selected);
    setSubmittedData(data);
  };

  const DynamicFormComponent = () => (
    <VStack>
      <Heading fontSize={32}>
        Login
      </Heading>
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
      <IconButton
        onClick={() => router.push(`/`)}
        aria-label="Previous"
        icon={<FaArrowLeft />}
        bg="green"
        h="30px"
        w="50px"
        _hover={{ color: "#228B22" }}
        _active={{ color: "green" }}
        m={4}
      />
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
