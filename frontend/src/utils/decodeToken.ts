import { jwtDecode } from "jwt-decode";

interface JwtDecodeProps {
  exp: number;
  iat: number;
  id: string;
  sub: string;
}

export const decodeToken = (token: string) => {
  try {
    const decoded = jwtDecode<JwtDecodeProps>(token);
    return decoded;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};
