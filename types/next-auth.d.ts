import type { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string
    refreshToken?: string
    expiresAt?: number
    user: {
      id: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    expiresAt?: number
    id?: string
  }
}

