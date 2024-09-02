import { Box, Button, Flex, Link, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import { GeneralBody } from "@/components/generalBody";

const Home = () => {
  const router = useRouter();
  const { selected, setSelected } = useAppContext();

  const onSelected = (type: string) => {
    setSelected(type);
  };

  const onRoute = (route: string) => {
    router.push(`auth/${route}`);
  };

  const componentButtons = () => (
    <VStack justify="center" w="50%">
      <Button mr={2} w="200px" onClick={() => onRoute("login")}>
        Login
      </Button>
      <Button w="200px" onClick={() => onRoute("register")}>
        Cadastrar
      </Button>
    </VStack>
  );

  return (
    <main>
      <Box as="header" color="white" p={4} mb="1%">
        <Flex w="100%" justify="center" align="center">
          <Link
            mr={12}
            cursor="pointer"
            userSelect="none"
            _hover={{ color: "#228B22", textDecoration: "underline" }}
            _active={{ color: "green" }}
            onClick={() => onSelected("doctors")}
          >
            Sou médico
          </Link>
          <Link
            ml={12}
            cursor="pointer"
            userSelect="none"
            _hover={{ color: "#228B22", textDecoration: "underline" }}
            _active={{ color: "green" }}
            onClick={() => onSelected("users")}
          >
            Sou consultante
          </Link>
        </Flex>
      </Box>
      <GeneralBody selected={selected} renderComponent={componentButtons} />
    </main>
  );
};

export default Home;
