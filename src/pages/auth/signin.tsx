import type { NextPageWithLayout } from '@/types';
import { useState } from 'react';
import { NextSeo } from 'next-seo';
import AuthLayout from '@/layouts/_auth-layout';
import Button from '@/components/ui/button';
import HexlantLogo from '@/assets/images/hexlant-logo.png';
import Image from '@/components/ui/image';
import AnchorLink from '../../components/ui/links/anchor-link';
import { CloseEyeIcon } from '../../components/icons/close-eye';
import { OpenEyeIcon } from '../../components/icons/open-eye';
import routes from '../../config/routes';
import { useRouter } from 'next/router';
import InputFloatingLabel from '../../components/ui/forms/input-floating-label';
import { Provider } from 'next-auth/providers';
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from 'next-auth/react';

type SignInPageProps = {
  providers: Provider[];
  csrfToken: any;
};

function SignInPage({ providers, csrfToken }: SignInPageProps) {
  const router = useRouter();

  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  function goToSignUpPage() {
    router.push(routes.sign_up);
  }
  return (
    <>
      <NextSeo title="SignIn" />
      <AuthLayout>
        {/*      */}
        {/* Logo */}
        {/*      */}
        <div className="mt-5 mb-10 flex justify-center">
          <AnchorLink
            href="/auth/sign-in"
            className="flex w-28 outline-none sm:w-32 4xl:w-36"
          >
            <span className="relative flex overflow-hidden">
              <Image src={HexlantLogo} alt="" priority />
            </span>
          </AnchorLink>
        </div>
        {/*                */}
        {/* Welcom Message */}
        {/*                */}
        <div className="mb-1.5">
          <div className="relative mb-3">
            <span className="mb-3 block text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
              Welcome Back! 👋
            </span>
            <span className="mt-1 block text-xs tracking-tighter text-gray-600 dark:text-gray-400 sm:text-sm">
              Please sign-in to your account and start easy management
            </span>
          </div>
        </div>
        {/*             */}
        {/* Input Field */}
        {/*             */}
        <div className="mb-1 pb-1">
          <div className="flex flex-col gap-3">
            <InputFloatingLabel
              type="email"
              label="Email"
              value={email}
              className="mt-3 "
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <InputFloatingLabel
                label="Password"
                className="mt-5"
                value={password}
                type={showPassword ? 'text' : 'password'}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute inset-y-1 right-0 top-6 flex items-center pr-3 text-sm">
                <button
                  className="hover:-translate-y-0.5 hover:shadow-large focus:shadow-large focus:outline-none "
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <OpenEyeIcon /> : <CloseEyeIcon />}
                </button>
              </div>
            </div>
            <div className="mt-2 flex justify-between">
              <label className="ml-2  block font-bold text-gray-500">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => {
                    setRememberMe(e.target.checked);
                  }}
                />

                <span className="ml-2 py-2 text-sm leading-snug text-gray-600">
                  Remember Me
                </span>
              </label>

              <label className="block font-bold text-gray-500">
                <div className="cursor-pointer tracking-tighter text-blue-700 hover:border-gray-400">
                  <span>Forgot Password?</span>
                </div>
              </label>
            </div>
          </div>
        </div>
        {/*              */}
        {/* Login Button */}
        {/*              */}
        <Button
          size="large"
          shape="rounded"
          fullWidth={true}
          className="uppercase xs:mt-8 xs:tracking-widest"
        >
          Login
        </Button>
        <div className="relative mb-3">
          <div className="mt-8 flex justify-center text-xs tracking-tighter sm:text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Would you like to join?
            </span>
            <div
              className="ml-3 cursor-pointer tracking-tighter text-blue-800"
              onClick={() => goToSignUpPage()}
            >
              create an account
            </div>
          </div>
        </div>
        <div className="mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6" />
        {Object.values(providers).map((provider: any) => {
          return (
            <div key={provider.name}>
              <Button
                size="large"
                shape="rounded"
                fullWidth={true}
                className="uppercase xs:mt-8 xs:tracking-widest"
                onClick={() => signIn(provider.id)}
              >
                {provider.name}
              </Button>
            </div>
          );
        })}
      </AuthLayout>
    </>
  );
}

SignInPage.getInitialProps = async (context: any) => {
  const { req, res } = context;

  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
    return;
  }
  return {
    session: undefined,
    providers: await getProviders(),
    csrfToken: await getCsrfToken(context),
  };
};

export default SignInPage;
