import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@/types';
import { useState } from 'react';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'next-themes';
import ModalsContainer from '@/components/modal-views/container';
import DrawersContainer from '@/components/drawer-views/container';
import SettingsButton from '@/components/settings/settings-button';
import PageDrawer from '@/components/settings/page-drawer';
import SettingsDrawer from '@/components/settings/settings-drawer';
import { WalletProvider } from '@/lib/hooks/use-connect';
// base css file
import 'swiper/css';
import '@/assets/css/scrollbar.css';
import '@/assets/css/globals.css';
import '@/assets/css/range-slider.css';
import { RecoilRoot } from 'recoil';
import { SessionProvider } from 'next-auth/react';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Head>
        {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <RecoilRoot>
            <Hydrate state={pageProps.dehydratedState}>
              <ThemeProvider
                attribute="class"
                enableSystem={false}
                defaultTheme="dark"
              >
                <WalletProvider>
                  {getLayout(<Component {...pageProps} />)}
                  <SettingsButton />
                  <ModalsContainer />
                  <DrawersContainer />
                </WalletProvider>
              </ThemeProvider>
            </Hydrate>
          </RecoilRoot>
        </SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

export default CustomApp;
