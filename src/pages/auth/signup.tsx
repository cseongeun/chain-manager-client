import type { NextPageWithLayout } from '@/types';
import { useState } from 'react';
import { NextSeo } from 'next-seo';
import AuthLayout from '@/layouts/_auth-layout';
import Button from '@/components/ui/button';
import HexlantLogo from '@/assets/images/hexlant-logo.png';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { CloseEyeIcon } from '@/components/icons/close-eye';
import { OpenEyeIcon } from '@/components/icons/open-eye';
import routes from '@/config/routes';
import { useRouter } from 'next/router';
import InputFloatingLabel from '@/components/ui/forms/input-floating-label';

const SignUp: NextPageWithLayout = () => {
  const router = useRouter();

  const [username, setUsername] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  function goToSignInPage() {
    setTimeout(() => {
      router.push(routes.sign_in);
    }, 800);
  }
  return (
    <>
      <NextSeo title="SignIn" />
      <AuthLayout>
        {/*      */}
        {/* Logo */}
        {/*      */}
        <div className="mt-5 ml-6 mb-10 flex justify-center">
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
              Welcome! 👋
            </span>
            <span className="mt-1 block text-xs tracking-tighter text-gray-600 dark:text-gray-400 sm:text-sm">
              Create an account to start
            </span>
          </div>
        </div>
        {/*             */}
        {/* Input Field */}
        {/*             */}
        <div className="mb-1 pb-1">
          <div className="flex flex-col gap-3">
            <InputFloatingLabel
              label="username"
              className="mt-5"
              onChange={(e) => setUsername(e.target.value)}
            />

            <InputFloatingLabel
              label="email"
              className="mt-5"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <InputFloatingLabel
                label="Password"
                className="mt-5"
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

            <div className="text ml-2 mt-2 block flex">
              <input type="checkbox" />
              <span className="ml-2 text-sm leading-snug text-gray-400">
                I agree to
              </span>
              <div className="ml-3 cursor-pointer tracking-tighter text-blue-800">
                privacy policy & terms
              </div>
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
          SignUp
        </Button>
        {/* <div className="relative mb-3">
          <div className="mt-8 flex justify-center text-xs tracking-tighter sm:text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Would you like to join?
            </span>
            <div className="ml-3 cursor-pointer tracking-tighter text-blue-800">
              create an account
            </div>
          </div>
        </div>

        <div className="mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6" /> */}
      </AuthLayout>
    </>
  );
};

export default SignUp;
