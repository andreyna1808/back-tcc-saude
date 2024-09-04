import { Box, Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import { GeneralBody } from "@/components/generalBody";
import { HeaderLink } from "@/components/headerLink";
import useAuthRedirect from "@/hooks/Auth/useAuthRedirect";

const Home = () => {
  useAuthRedirect();
  const router = useRouter();
  const { selected, setSelected } = useAppContext();

  const onSelected = (type: "doctors" | "users") => {
    setSelected(type);
  };

  const onRoute = (route: string) => {
    router.push(`auth/${route}`);
  };

  const componentButtons = () => (
    <VStack justify="center" w="50%" align="center">
      <Button w="280px" onClick={() => onRoute("login")}>
        Login
      </Button>
      <Button w="280px" onClick={() => onRoute("register")}>
        Cadastrar
      </Button>
    </VStack>
  );

  return (
    <main>
      <Box as="header" color="white" p={4} mb="1%">
        <HeaderLink onSelected={onSelected} />
      </Box>
      <GeneralBody selected={selected} renderComponent={componentButtons} />
    </main>
  );
};

export default Home;
