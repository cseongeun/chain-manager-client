import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import routes from '../../config/routes';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return routes.signIn;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
});
