import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@/types';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'next-themes';
import ModalsContainer from '@/components/modal-views/container';
// base css file
import 'swiper/css';
import '@/assets/css/scrollbar.css';
import '@/assets/css/globals.css';
import '@/assets/css/range-slider.css';
import { RecoilRoot } from 'recoil';
import { SessionProvider, useSession } from 'next-auth/react';
import {
  chain,
  configureChains,
  createClient,
  defaultChains,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import Web3AuthProvider from '../libs/providers/web3-auth-provider';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import routes from '../config/routes';
import { getDefaultProvider } from 'ethers';
import { InjectedConnector } from 'wagmi/connectors/injected';
import 'i18n';

function Auth({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;
    if (status == 'unauthenticated' || !session.accessToken) {
      router.push(routes.sign_in);
    }
  }, [router, session, status]);

  return children;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => page);

  const { chains, provider } = configureChains(defaultChains, [
    publicProvider(),
  ]);

  const wagmiClient = createClient({
    autoConnect: true,
    connectors: [new InjectedConnector({ chains })],
    provider,
  });

  return (
    <>
      {mounted && (
        <>
          <Head>
            {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1 maximum-scale=1"
            />
          </Head>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <SessionProvider
                session={session}
                refetchInterval={0}
                refetchOnWindowFocus={true}
              >
                <WagmiConfig client={wagmiClient}>
                  <RecoilRoot>
                    <ThemeProvider
                      attribute="class"
                      enableSystem={false}
                      defaultTheme="dark"
                    >
                      <Web3AuthProvider>
                        <Auth>{getLayout(<Component {...pageProps} />)}</Auth>

                        <ModalsContainer />
                        <ToastContainer
                          position="top-right"
                          autoClose={5000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          draggable={false}
                          closeOnClick
                          pauseOnHover
                        />
                      </Web3AuthProvider>
                    </ThemeProvider>
                  </RecoilRoot>
                </WagmiConfig>
              </SessionProvider>
            </Hydrate>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </QueryClientProvider>
        </>
      )}
    </>
  );
}

export default CustomApp;
