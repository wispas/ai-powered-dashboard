import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      role: "ADMIN" | "USER";
    };
  }

  interface User {
    id: number;
    email: string;
    role: "ADMIN" | "USER";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    email: string;
    role: "ADMIN" | "USER";
  }
}
