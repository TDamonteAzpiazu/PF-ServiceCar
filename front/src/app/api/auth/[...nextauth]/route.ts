import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const url = process.env.NEXT_PUBLIC_URL;

      try {
        const res = await fetch(`${url}/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            address: "AV. 9 de Julio 123",
            password: "Usuario1234!",
            repeatPassword: "Usuario1234!",
          }),
        });
        const data = await res.json();
        if (res) {

          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error("Error en signIn callback", error);
        return false;
      }
    },

  },
});

export { handler as GET, handler as POST };


