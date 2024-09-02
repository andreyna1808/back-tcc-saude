import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Input,
  Button,
  Box,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";

interface DynamicFormProps {
  typeConfirm: "Entrar" | "Cadastrar" | "Atualizar";
  typeChange: "Realizar Login" | "Realizar Cadastro" | "Voltar";
  fields: string[];
  onSubmit: (data: Record<string, any>) => void;
  onChangeEvent: () => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  onSubmit,
  typeChange,
  typeConfirm,
  onChangeEvent,
}) => {
  const { control, handleSubmit } = useForm();

  const renderField = (field: string) => {
    switch (field) {
      case "password":
        return (
          <FormControl key={field} mb={4}>
            <FormLabel>Senha</FormLabel>
            <Controller
              name={field}
              control={control}
              defaultValue=""
              render={({ field }) => <Input type="password" {...field} />}
            />
          </FormControl>
        );
      case "email":
        return (
          <FormControl key={field} mb={4}>
            <FormLabel>Email</FormLabel>
            <Controller
              name={field}
              control={control}
              defaultValue=""
              render={({ field }) => <Input type="email" {...field} />}
            />
          </FormControl>
        );
      case "name":
        return (
          <FormControl key={field} mb={4}>
            <FormLabel>Nome</FormLabel>
            <Controller
              name={field}
              control={control}
              defaultValue=""
              render={({ field }) => <Input type="text" {...field} />}
            />
          </FormControl>
        );
      case "nickname":
        return (
          <FormControl key={field} mb={4}>
            <FormLabel>Nickname</FormLabel>
            <Controller
              name={field}
              control={control}
              defaultValue=""
              render={({ field }) => <Input type="text" {...field} />}
            />
          </FormControl>
        );
      case "crm":
        return (
          <FormControl key={field} mb={4}>
            <FormLabel>CRM</FormLabel>
            <Controller
              name={field}
              control={control}
              defaultValue=""
              render={({ field }) => <Input type="text" {...field} />}
            />
          </FormControl>
        );
      case "specialty":
        return (
          <FormControl key={field} mb={4}>
            <FormLabel>Especialidade</FormLabel>
            <Controller
              name={field}
              control={control}
              defaultValue=""
              render={({ field }) => <Input type="text" {...field} />}
            />
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map(renderField)}
        <HStack>
          <Button type="submit" colorScheme="teal" mt={4} px={4}>
            {typeConfirm}
          </Button>
          <Button colorScheme="teal" bg="gray" _hover={{bg: "#a0a0a0"}} mt={4} px={4} onClick={onChangeEvent}>
            {typeChange}
          </Button>
        </HStack>
      </form>
    </Box>
  );
};
