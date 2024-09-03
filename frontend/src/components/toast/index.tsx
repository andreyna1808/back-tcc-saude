import { useToast } from "@chakra-ui/react";

interface ToastOptions {
  type: "error" | "warning" | "success";
  description: string;
  title: string;
}

export const showToast = (
  toast: ReturnType<typeof useToast>,
  { type, description, title }: ToastOptions
) => {
  return toast({
    position: "top-right",
    title: title,
    description: description,
    status: type,
    duration: 3000,
    isClosable: true,
  });
};
