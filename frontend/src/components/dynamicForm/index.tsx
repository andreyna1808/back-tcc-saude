import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Input,
  Button,
  Box,
  FormControl,
  FormLabel,
  HStack,
  Flex,
} from "@chakra-ui/react";

interface DynamicFormProps {
  typeConfirm: "Entrar" | "Cadastrar" | "Atualizar";
  typeChange: "Realizar Login" | "Realizar Cadastro" | "Voltar" | "Cancelar";
  fields: string[];
  onSubmit: (data: Record<string, any>) => void;
  onChangeEvent: () => void;
  defaultValues?: Record<string, any>;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  onSubmit,
  typeChange,
  typeConfirm,
  onChangeEvent,
  defaultValues = {},
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const renderField = (field: string) => {
    const isRequired = {
      required: "Este campo é obrigatório",
    };

    switch (field) {
      case "password":
        return (
          <FormControl key={field} mb={4} isInvalid={!!errors[field]}>
            <FormLabel>Senha</FormLabel>
            <Controller
              name={field}
              control={control}
              rules={isRequired}
              defaultValue=""
              render={({ field }) => (
                <Input
                  type="password"
                  w="300px"
                  className="chackra-input"
                  bg="gray.200"
                  {...field}
                />
              )}
            />
            <p className="error-message">{errors[field]?.message as string}</p>
          </FormControl>
        );
      case "email":
        return (
          <FormControl key={field} mb={4} isInvalid={!!errors[field]}>
            <FormLabel>Email</FormLabel>
            <Controller
              name={field}
              control={control}
              rules={isRequired}
              defaultValue=""
              render={({ field }) => (
                <Input type="email" w="300px" bg="gray.200" {...field} />
              )}
            />
            <p className="error-message">{errors[field]?.message as string}</p>
          </FormControl>
        );
      case "name":
        return (
          <FormControl key={field} mb={4} isInvalid={!!errors[field]}>
            <FormLabel>Nome</FormLabel>
            <Controller
              name={field}
              control={control}
              rules={isRequired}
              defaultValue=""
              render={({ field }) => (
                <Input type="text" w="300px" bg="gray.200" {...field} />
              )}
            />
            <p className="error-message">{errors[field]?.message as string}</p>
          </FormControl>
        );
      case "nickname":
        return (
          <FormControl key={field} mb={4} isInvalid={!!errors[field]}>
            <FormLabel>Nickname</FormLabel>
            <Controller
              name={field}
              control={control}
              rules={isRequired}
              defaultValue=""
              render={({ field }) => (
                <Input type="text" w="300px" bg="gray.200" {...field} />
              )}
            />
            <p className="error-message">{errors[field]?.message as string}</p>
          </FormControl>
        );
      case "crm":
        return (
          <FormControl key={field} mb={4} isInvalid={!!errors[field]}>
            <FormLabel>CRM</FormLabel>
            <Controller
              name={field}
              control={control}
              rules={isRequired}
              defaultValue=""
              render={({ field }) => (
                <Input type="text" w="300px" bg="gray.200" {...field} />
              )}
            />
            <p className="error-message">{errors[field]?.message as string}</p>
          </FormControl>
        );
      case "specialty":
        return (
          <FormControl key={field} mb={4} isInvalid={!!errors[field]}>
            <FormLabel>Especialidade</FormLabel>
            <Controller
              name={field}
              control={control}
              rules={isRequired}
              defaultValue=""
              render={({ field }) => (
                <Input type="text" w="300px" bg="gray.200" {...field} />
              )}
            />
            <p className="error-message">{errors[field]?.message as string}</p>
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <Flex p={4} w="100%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack flexWrap="wrap">
          {fields.map((field, index) => (
            <Box key={index} minW="300px" mr={4}>
              {renderField(field)}
            </Box>
          ))}
          <HStack mt={4}>
            <Button
              type="submit"
              bg="#228B22"
              _hover={{ bg: "green" }}
              color="white"
            >
              {typeConfirm}
            </Button>
            <Button
              bg="#a0a0a0"
              color="black"
              _hover={{ bg: "gray" }}
              onClick={onChangeEvent}
            >
              {typeChange}
            </Button>
          </HStack>

        </HStack>
      </form>
    </Flex>
  );
};
