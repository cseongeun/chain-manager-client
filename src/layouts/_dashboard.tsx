import cn from 'classnames';
import Sidebar from '@/layouts/_dashboard-sidebar';
import { Header } from '@/components/header/header';

interface DashboardLayoutProps {
  contentClassName?: string;
  authPage?: boolean;
}

export default function Layout({
  children,
  contentClassName,
  authPage,
}: React.PropsWithChildren<DashboardLayoutProps>) {
  return authPage ? (
    <div>
      <main
        className={cn(
          'min-h-[100vh] px-4 pt-24 pb-16 sm:px-6 sm:pb-20 lg:px-8 xl:px-10 xl:pb-24 3xl:px-12',
          contentClassName
        )}
      >
        {children}
      </main>
    </div>
  ) : (
    <div className="ltr:xl:pl-72 rtl:xl:pr-72 ltr:2xl:pl-80 rtl:2xl:pr-80">
      <div>
        <Header />
        <Sidebar className="hidden xl:block" />
      </div>
      <main
        className={cn(
          'min-h-[100vh] px-4 pt-24 pb-16 sm:px-6 sm:pb-20 lg:px-8 xl:px-10 xl:pb-24 3xl:px-12',
          contentClassName
        )}
      >
        {children}
      </main>
    </div>
  );
}
