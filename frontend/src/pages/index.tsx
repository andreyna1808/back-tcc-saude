import { useState } from "react";
import { Box, Button, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import LogoImage from "../../public/favicon.ico"

export default function Home() {
  const [selected, setSelected] = useState("medico");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselData = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
  ];

  const handleNext = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const handlePrev = () => {
    setCarouselIndex((prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length);
  };

  console.log('Aqq: ', selected)

  return (
    <main>
      <Box as="header" bg="gray.800" color="white" p={4}>
        <Flex align="center">
          <Flex w="100%" justify="center">
            <Link mr={12} cursor="pointer" userSelect="none" _hover={{ color: "#228B22", textDecoration: "underline" }} _active={{ color: "green" }} onClick={() => setSelected("medico")}>
              Sou médico
            </Link>
            <Link ml={12} cursor="pointer" userSelect="none" _hover={{ color: "#228B22", textDecoration: "underline" }} _active={{ color: "green" }} onClick={() => setSelected("consultante")}>
              Sou consultante
            </Link>
          </Flex>
        </Flex>
      </Box>

      <Box flex="1" p={4}>
        {selected === "medico" ? (
          <Flex direction="column" align="center">
            <Image src={`${LogoImage}`} alt="Imagem" mb={4} />
            <Heading size="lg">Saber Saudável</Heading>
            <Flex mt={4} align="center">
              <Button onClick={handlePrev} mr={2}>
                <FaArrowLeft />
              </Button>
              <Text>{carouselData[carouselIndex]}</Text>
              <Button onClick={handleNext} ml={2}>
                <FaArrowRight />
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Flex direction="column" align="center">
            <Image src={`${LogoImage}`} alt="Imagem" mb={4} />
            <Heading size="lg">Saber Saudável</Heading>
            <Flex mt={4} align="center">
              <Button onClick={handlePrev} mr={2}>
                <FaArrowLeft />
              </Button>
              <Text>{carouselData[carouselIndex]}</Text>
              <Button onClick={handleNext} ml={2}>
                <FaArrowRight />
              </Button>
            </Flex>
          </Flex>
        )}
      </Box>

      <Box as="footer" bg="gray.800" color="white" p={4}>
        <Flex justify="center">
          <Button colorScheme="teal" mr={2}>
            Login
          </Button>
          <Button colorScheme="teal">Cadastrar</Button>
        </Flex>
      </Box>
    </main>
  );
};
