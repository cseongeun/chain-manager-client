import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { api_signIn, signIn } from '../../../apis/auth';
import { AuthProvider } from '../../../config/auth-providers';
import routes from '../../../config/routes';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      let provider: AuthProvider;
      let identity: string;

      if (account.provider == AuthProvider.GOOGLE) {
        const { email } = user;
        provider = AuthProvider.GOOGLE;
        identity = email!;
      } else {
        throw Error('');
      }

      const serverSignIn = await api_signIn({
        provider,
        email: identity,
      });

      user.accessToken = serverSignIn.accessToken;

      return true;
    },
    async redirect({ url, baseUrl }) {
      return routes.signIn;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token = { accessToken: user.accessToken };
      }

      return token;
    },
    async session({ session, user, token }) {
      session.accessToken = token.accessToken;
      // session.user = getUserFromTheAPIServer(session.accessToken)

      return session;
    },
  },
});
