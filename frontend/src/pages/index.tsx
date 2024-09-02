import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { doctorTexts, patientTexts } from "@/assets/mocks/carouselData";

export default function Home() {
  const [selected, setSelected] = useState("medico");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselData = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  ];

  const handleNext = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const handlePrev = () => {
    setCarouselIndex(
      (prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length
    );
  };

  const handleIndicatorClick = (index: number) => {
    setCarouselIndex(index);
  };

  const handleSelected = (type: string) => {
    setSelected(type);
    setCarouselIndex(0);
  };

  return (
    <main>
      <Box as="header" bg="gray.800" color="white" p={4}>
        <Flex align="center">
          <Flex w="100%" justify="center">
            <Link
              mr={12}
              cursor="pointer"
              userSelect="none"
              _hover={{ color: "#228B22", textDecoration: "underline" }}
              _active={{ color: "green" }}
              onClick={() => handleSelected("medico")}
            >
              Sou médico
            </Link>
            <Link
              ml={12}
              cursor="pointer"
              userSelect="none"
              _hover={{ color: "#228B22", textDecoration: "underline" }}
              _active={{ color: "green" }}
              onClick={() => handleSelected("consultante")}
            >
              Sou consultante
            </Link>
          </Flex>
        </Flex>
      </Box>

      <VStack p={4} mt="1%">
        <Flex justify="center" align="center">
          <Image
            src="favicon.ico"
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

        <HStack spacing={0} mt="5%" w="80%" h="auto">
          <VStack mt={4} align="center" w="50%">
            <Text textAlign="center" maxW="100%" px={4}>
              <Heading fontSize={64}>
                {selected == "medico" ? "Médico" : "Consultante"}
              </Heading>
              {selected == "medico"
                ? doctorTexts[carouselIndex]
                : patientTexts[carouselIndex]}
            </Text>
            <Flex mt={4} w="100%" justify="space-between">
              <IconButton
                onClick={handlePrev}
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
                {carouselData.map((_, index) => (
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
                    onClick={() => handleIndicatorClick(index)}
                  />
                ))}
              </HStack>
              <IconButton
                onClick={handleNext}
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

          <VStack justify="center" w="50%">
            <Button mr={2} w="200px">
              Login
            </Button>
            <Button w="200px">Cadastrar</Button>
          </VStack>
        </HStack>
      </VStack>
    </main>
  );
}
