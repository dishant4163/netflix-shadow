import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const authOptions = {
    providers: [
        GithubProvider({
            clientId: 'Iv1.f418c190be61c948',
            clientSecret: 'ff4b4ef8deeaa619899f39a9ff583a99f7023078'
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            session.user.username = session?.user?.name
                .split(" ")
                .join("")
                .toLocaleLowerCase();

            session.user.uid = token.sub;

            return session;
        },
    },
    secret: "default_secret_key",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
