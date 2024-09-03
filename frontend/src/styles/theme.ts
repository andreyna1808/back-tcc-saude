import { extendTheme } from "@chakra-ui/react";
import { cardTheme } from "./cardTheme";

const theme = extendTheme({
  colors: {
    bg: "#343A40",
    button: {
      default: "#008000",
      hover: "#228B22",
      active: "#008000",
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "5px",
        fontWeight: "bold",
        bg: "button.default",
        color: "white",
      },
      sizes: {
        md: {
          height: "40px",
          width: "100%",
        },
      },
      variants: {
        solid: {
          bg: "button.default",
          color: "white",
          _hover: {
            bg: "button.hover",
          },
          _active: {
            bg: "button.active",
          },
        },
      },
      defaultProps: {
        size: "md",
        variant: "solid",
      },
    },
    Card: cardTheme,
  },
  styles: {
    global: {
      body: {
        bg: "bg",
      },
    },
  },
});

export default theme;
