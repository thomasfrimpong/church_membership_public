import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import bcrypt from "bcryptjs";

import connectMongoDB from "@/lib/mongodb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne({ email, active: true })
            .populate("church_id")
            .select({
              first_name: 1,
              email: 1,
              id: 1,
              password: 1,
              type_of_admin: 1,
            });
          console.log(user);

          if (!user) {
            return null;
          }
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.log("Error:", error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      //console.log("jwt callback", { token, user, session });

      if (user) {
        return {
          ...token,
          first_name: user.first_name,
          chuch_id: user.church_id._id,
          church_name: user.church_id.church_name,
          type_of_admin: user.type_of_admin,
          brand_colour_1: user.church_id.brand_colour_1,
          brand_colour_2: user.church_id.brand_colour_2,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      //console.log("session callback", { session, token, user });

      //pass in first_name, etc to session
      return {
        ...session,
        user: {
          ...session.user,
          first_name: token.first_name,
          church_id: token.chuch_id,
          church_name: token.church_name,
          type_of_admin: token.type_of_admin,
          brand_colour_1: token.brand_colour_1,
          brand_colour_2: token.brand_colour_2,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
