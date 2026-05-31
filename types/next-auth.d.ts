import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: "employer" | "jobseeker"
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    role?: "employer" | "jobseeker"
  }
}