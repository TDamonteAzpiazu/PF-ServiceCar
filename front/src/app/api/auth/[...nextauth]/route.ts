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
    async signIn({ user, account }) {
      const url = process.env.NEXT_PUBLIC_URL; 

      try {
        const token = account?.access_token;

        const res = await fetch(`${url}/auth/authGoogle`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            token: token, 
          }),
        });

        const data = await res.json();

        if (res.ok && data.token) {
          console.log(data);
          return true;
        } else {
          console.error("Error al enviar datos a authGoogle:", data);
          return false;
        }
      } catch (error) {
        console.error("Error en signIn callback:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
