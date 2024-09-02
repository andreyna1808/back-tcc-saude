import React from "react";
import { Text, VStack, Spinner } from "@chakra-ui/react";

export const GeneralBody: React.FC = () => {
  return (
    <main>
      <VStack w="100%" h="95vh" justify="center" align="center">
        <Spinner
          thickness="4px"
          speed="1s"
          emptyColor="gray"
          color="green"
          boxSize="100px"
        />
        <Text mt={4}> Carregando...</Text>
      </VStack>
    </main>
  );
};
