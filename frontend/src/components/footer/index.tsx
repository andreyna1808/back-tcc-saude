import { Box, Text, Link, Flex } from "@chakra-ui/react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export const Footer = () => {
    return (
        <Box bg="black" w="100%" h="5vh" display="flex" justifyContent="center">
            <Flex align="center" justifyContent="space-around" w="100%" h="100%">
                <Text>© 2024 Todos os direitos reservados</Text>
                <Flex align="center">
                    <Text mr={4}>Siga nas redes: </Text>
                    <Link href="https://www.linkedin.com/in/andreyna-carvalho-997273231/" isExternal mx={2}>
                        <FaLinkedin size="24" />
                    </Link>
                    <Link href="https://github.com/andreyna1808" isExternal mx={2}>
                        <FaGithub size="24" />
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
};
