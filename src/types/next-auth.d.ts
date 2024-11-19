import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      profile: UserProfile;
    };
  }
  interface JWT {
    user: {
      address: string;
      accessToken: string;
      username: string;
      email: string;
      roles: string[];
    };
  }
}
