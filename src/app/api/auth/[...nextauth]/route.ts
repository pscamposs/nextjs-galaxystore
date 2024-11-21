import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";
import { cookies } from "next/headers";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        const response = await fetch(`${process.env.API_URL}/auth/login`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (response.ok && data.token) {
          const cookiesStore = await cookies();
          cookiesStore.set("galaxy-store.session", data.token);

          const profileResponse = await fetch(
            `${process.env.API_URL}/user/profile`,
            {
              headers: {
                Authorization: `Bearer ${data.token}`,
              },
            }
          );

          if (!profileResponse.ok) {
            return null;
          }

          const profile = await profileResponse.json();

          return {
            ...data,
            profile,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      const profileResponse = await fetch(
        `${process.env.API_URL}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token?.user.token}`,
          },
        }
      );

      if (profileResponse.ok) {
        const profile = await profileResponse.json();
        token.user.profile = profile;
      } else {
        signOut();
      }

      if (token.user) {
        session.user = token.user as any;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
