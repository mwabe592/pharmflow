import { jwtDecode } from "jwt-decode";

type MyJwtPayload = {
  aud: string;
  exp: number;
  iat: number;
  email: string;
  sub: string;
  user_role: string; // required now
};

export function getUserRoleFromToken(token: string): string {
  try {
    const decoded = jwtDecode<MyJwtPayload>(token);
    return decoded.user_role.toLowerCase();
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    throw new Error("Invalid token");
  }
}