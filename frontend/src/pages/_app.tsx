import "../styles/global.css";
import type { AppProps } from "next/app";
import { AppProvider } from "@/context/AppContext";
import { AuthProvider } from "@/context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </AppProvider>
    </ChakraProvider>
  );
}
