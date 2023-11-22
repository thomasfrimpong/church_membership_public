import NextAuth, { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      churh_id: string;
      church_name: string;
      email: string;
      first_name: string;
      type_of_admin: string;
      brand_colour_1: string;
      brand_colour_2: string;
    } & DefaultSession["user"];
  }
}
