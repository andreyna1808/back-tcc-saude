import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { doctorTexts, patientTexts } from "@/assets/mocks/carouselData";

interface GeneralBodyProps {
  selected: string;
  renderComponent: () => React.ReactNode;
}

export const GeneralBody: React.FC<GeneralBodyProps> = ({
  selected,
  renderComponent,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const carouselData = selected === "doctors" ? doctorTexts : patientTexts;
  const [carouselIndex, setCarouselIndex] = useState(0);

  const onNext = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const onPrev = () => {
    setCarouselIndex(
      (prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length
    );
  };

  const onIndicatorClick = (index: number) => {
    setCarouselIndex(index);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <VStack p={4}>
      <Flex justify="center" align="center">
        <Image
          src="/favicon.ico"
          alt="Imagem"
          mb={4}
          w="300px"
          borderRadius="100%"
        />
        <VStack ml={14}>
          <Heading fontSize={64}>Saber</Heading>
          <Heading fontSize={64}>Saudável</Heading>
        </VStack>
      </Flex>

      <HStack
        spacing={0}
        mt="2%"
        w="80%"
        h="auto"
        justify="space-around"
        align="center"
      >
        <VStack align="center" w="50%">
          <Heading fontSize={64}>
            {selected === "doctors" ? "Médico" : "Consultante"}
          </Heading>
          <Text textAlign="center" maxW="100%" px={4}>
            {carouselData[carouselIndex]}
          </Text>
          <Flex mt={4} w="100%" justify="space-between">
            <IconButton
              onClick={onPrev}
              aria-label="Previous"
              icon={<FaArrowLeft />}
              bg="none"
              h="30px"
              w="30px"
              _hover={{ color: "#228B22" }}
              _active={{ color: "green" }}
              _focus={{ boxShadow: "none" }}
              mr={2}
            />
            <HStack spacing={2}>
              {carouselData.map((_: any, index: number) => (
                <Box
                  key={index}
                  ml={2}
                  mr={2}
                  w="10px"
                  h="10px"
                  borderRadius="50%"
                  bg={carouselIndex === index ? "green" : "gray"}
                  cursor="pointer"
                  _hover={{ bg: "#228B22" }}
                  onClick={() => onIndicatorClick(index)}
                />
              ))}
            </HStack>
            <IconButton
              onClick={onNext}
              aria-label="Next"
              icon={<FaArrowRight />}
              bg="none"
              h="30px"
              w="30px"
              _hover={{ color: "#228B22" }}
              _active={{ color: "green" }}
              _focus={{ boxShadow: "none" }}
              ml={2}
            />
          </Flex>
        </VStack>
        {renderComponent()}
      </HStack>
    </VStack>
  );
};
