import NextAuth, { NextAuthOptions, User } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { api_signIn, api_signUp } from '../../../apis/auth';
import { api_getProfile, api_getUser } from '../../../apis/user';
import { AuthProvider } from '../../../config/auth-providers';
import routes from '../../../config/routes';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  

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
    signIn: routes.sign_in,
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

      const existUser = await api_getUser({ provider, email: identity });

      if (!existUser.data) {
        const newUser = await api_signUp({
          provider,
          email: identity,
          name: identity,
        });
      }

      const signInUser = await api_signIn({
        provider,
        email: identity,
      });

      user.accessToken = signInUser.data.accessToken;
      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log(user);
      if (user) {
        token = { accessToken: user.accessToken };
      }

      return token;
    },
    async session({ session, user, token }) {
      session.accessToken = token.accessToken;

      session.user = await (
        await api_getProfile(token.accessToken as string)
      ).data;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return routes.home;
    },
  },
};
export default NextAuth(authOptions);
