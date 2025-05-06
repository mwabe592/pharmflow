import { jwtDecode } from "jwt-decode";

type MyJwtPayload = {
  aud: string;
  exp: number;
  iat: number;
  email: string;
  sub: string;
  user_role?: string;
};

export function getUserRoleFromToken(accessToken: string): string {
  try {
    const decoded = jwtDecode<MyJwtPayload>(accessToken);
    return decoded.user_role?.toLowerCase() || "staff";
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return "staff"; // default role if not found
  }
}
