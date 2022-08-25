import WalletButtonn from '@/components/header/wallet-button';
import i18next from 'i18next';
import { useCallback, useState } from 'react';

const HeaderLanguage = () => {
  const [laguage, setLanguage] = useState<string>('en');

  const onChangeLanguage = useCallback((e: string) => {
    i18next.changeLanguage(e);
    setLanguage(e);
  }, []);
  return (
    <div className="relative order-last flex shrink-0 items-center gap-3 sm:gap-6 lg:gap-8">
      {/* <NotificationButton /> */}
      {/* <WalletButtonn /> */}
    </div>
  );
};

export default HeaderLanguage;
