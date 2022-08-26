import { useState } from 'react';
import { useWindowScroll } from '@/hooks/use-window-scroll';
import Hamburger from '@/components/ui/hamburger';
import SearchButton from '@/components/search/button';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useDrawer } from '@/components/drawer-views/context';
import HeaderWallet from '@/components/header/header-wallet';
import HeaderLanguage from './header-language';

export function Header() {
  const { openDrawer } = useDrawer();
  const isMounted = useIsMounted();
  let windowScroll = useWindowScroll();
  let [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 z-30 w-full transition-all duration-300 ltr:right-0 rtl:left-0 ltr:xl:pl-72 rtl:xl:pr-72 ltr:2xl:pl-80 rtl:2xl:pr-80 ${
        isMounted && windowScroll.y > 10
          ? 'h-16 bg-gradient-to-b from-white to-white/80 shadow-card backdrop-blur dark:from-dark dark:to-dark/80 sm:h-20'
          : 'h-16 sm:h-24'
      }`}
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10 3xl:px-12">
        <div className="flex items-center">
          <div className="block ltr:mr-1 rtl:ml-1 ltr:sm:mr-3 rtl:sm:ml-3 xl:hidden">
            <Hamburger
              isOpen={isOpen}
              onClick={() => openDrawer('DASHBOARD_SIDEBAR')}
              variant="transparent"
              className="dark:text-white"
            />
          </div>

          {/* <SearchButton variant="transparent" className="dark:text-white" /> */}
        </div>
        <HeaderLanguage />
        <HeaderWallet />
      </div>
    </nav>
  );
}
