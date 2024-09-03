import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    backgroundColor: "#1A202C",
    maxWidth: "600px",
    maxHeight: "200px",
    borderRadius: "10px",
    overflow: "hidden",
  }
});


export const cardTheme = defineMultiStyleConfig({ baseStyle });
